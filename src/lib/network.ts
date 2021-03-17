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

export interface NetworkOptions {
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
   * @param filePath The network URL of file to be fetched
   * @return The resource as parsed JSON object
   * @throws
   * [[`ResourceNotFoundException`]] if the request fails,
   * defined by the status being in [200, 300)
   * @warn Currently doesn't implement timeout logic
   */
  static async loadJSON(filePath: string): Promise<any> {
    const xhr = await Network.fetch(filePath, {
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
   * gives easy control of execution order and
   * rejects failed transactions.
   *
   * @return
   * The XHR as a Promise,
   * with a [[`ResourceNotFoundException`]] in case of rejection
   * @throws
   * [[`ResourceNotFoundException`]] if the request fails,
   * as defined by {@param resolveCondition}
   * @warn Currently doesn't implement timeout logic
   */
  static async fetch(
    url: string,
    {
      prerequest = () => {},
      method = "GET",
      body,
      resolveCondition = ({ status }) => status >= 200 && status < 300,
    }: Partial<NetworkOptions> = {}
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
}
