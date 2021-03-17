import { ErrorWithCode } from "./error";
import { Predicate } from "./misc";

export class HTTPError extends ErrorWithCode {
  constructor(code = 400, message = "HTTP Error") {
    super(code, message);
  }
}

export class ResourceNotFoundException extends HTTPError {
  constructor(code = 404, message = "Resource not found") {
    super(code, message);
  }
}

export interface XHRNetworkOptions {
  /**
   * Execute after opening but before sending the XHR {@param xhr}
   */
  prerequest: (xhr: XMLHttpRequest) => void;
  /**
   * The HTTP method by which to make the request
   */
  method:
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";
  body?: Document | BodyInit | null;
  /**
   * Determines when to resolve the Promise instead of rejecting
   *
   * Defaults to ensuring the status is in [200, 300)
   */
  resolveCondition: Predicate<XMLHttpRequest>;
}

export class Network {
  /**
   * Fetch a network resource as JSON and return the parsed object
   *
   * Use instead of `window.fetch` because it
   * rejects failed transactions
   * and provides a legacy XHR interface.
   * If the legacy interface is not a concern, use [[`Network.loadJSON`]].
   *
   * @param filePath The network URL of file to be fetched
   * @return The resource as parsed JSON object
   * @throws
   * [[`ResourceNotFoundException`]] if the request fails,
   * defined by the status being in [200, 300)
   * @warn Doesn't implement timeout logic
   * @deprecated
   */
  static async loadJSONXHR(filePath: string): Promise<any> {
    const xhr = await Network.fetchXHR(filePath, {
      prerequest: (xhr) => {
        xhr.overrideMimeType("application/json");
        xhr.responseType = "json";
      },
    });
    return xhr.response;
  }

  /**
   * `Promise` wrapper for `XMLHttpRequest`
   *
   * Use instead of `window.fetch` because it
   * rejects failed transactions
   * and provides a legacy XHR interface.
   * If the legacy interface is not a concern, use [[`Network.fetch`]].
   *
   * @return
   * The XHR as a Promise,
   * with a [[`ResourceNotFoundException`]] in case of rejection
   * @throws
   * [[`ResourceNotFoundException`]] if the request fails,
   * as defined by {@param resolveCondition}
   * @warn Doesn't implement timeout logic
   * @deprecated
   */
  static async fetchXHR(
    url: string,
    {
      prerequest = () => {},
      method = "GET",
      body,
      resolveCondition = ({ status }) => status >= 200 && status < 300,
    }: Partial<XHRNetworkOptions> = {}
  ): Promise<XMLHttpRequest> {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    prerequest(xhr);
    xhr.send(body);

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (resolveCondition(xhr)) resolve(xhr);
          else
            reject(new ResourceNotFoundException(xhr.status, xhr.statusText));
        }
      };
    });
  }

  /**
   * Makes a network request to a resource and returns its data parsed as JSON
   *
   * Use instead of `window.fetch` because it rejects failed transactions.
   *
   * @return The result of the request to the resource, parsed as JSON, if it is `ok`
   * @throws [[`ResourceNotFoundException`]] if not `ok`
   */
  static async loadJSON(input: RequestInfo, init?: RequestInit): Promise<any> {
    const response = await Network.fetch(input, init);
    return response.json();
  }

  /**
   * Makes a network request
   *
   * Use instead of `window.fetch` because it rejects failed transactions.
   *
   * @return The result of `window.fetch`, if it is `ok`
   * @throws [[`ResourceNotFoundException`]] if not `ok`
   */
  static async fetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const response = await window.fetch(input, init);
    if (response.ok) return response;
    throw new ResourceNotFoundException(response.status, response.statusText);
  }
}
