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
   * Execute before sending the XHR
   */
  prerequest: (xhr: XMLHttpRequest) => void;
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
   */
  resolveCondition: Predicate<XMLHttpRequest>;
}

export class Network {
  /**
   * Fetch a network resource as JSON and return parsed
   * @param filePath The network URL of file to be fetched
   * @return The resource as parsed JSON object
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
   * @return The XHR as a Promise,
   * with a {@linkcode ResourceNotFoundException} in case of rejection
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
