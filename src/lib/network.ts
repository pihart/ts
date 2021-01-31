import { ErrorWithCode } from "./error";

type Predicate<T> = (value: T) => boolean;

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

interface NetworkOptions {
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
  resolveCondition: Predicate<XMLHttpRequest>;
}

export class Network {
  static async loadJSON(filePath: string): Promise<any> {
    const xhr = await Network.fetch(filePath, {
      prerequest: (xhr) => {
        xhr.overrideMimeType("application/json");
        xhr.responseType = "json";
      },
    });
    return xhr.response;
  }

  static async fetch(
    url: string,
    {
      prerequest = () => {},
      method = "GET",
      body,
      resolveCondition = ({ status }) => status >= 200 && status < 300,
    }: Partial<NetworkOptions>
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
