import { ErrorWithCode } from "./error";
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
export class Network {
    /**
     * Fetch a network resource as JSON and return parsed
     * @param filePath The network URL of file to be fetched
     * @return The resource as parsed JSON object
     */
    static async loadJSON(filePath) {
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
    static async fetch(url, { prerequest = () => { }, method = "GET", body, resolveCondition = ({ status }) => status >= 200 && status < 300, } = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        prerequest(xhr);
        xhr.send(body);
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (resolveCondition(xhr))
                        resolve(xhr);
                    else
                        reject(new ResourceNotFoundException(xhr.status, xhr.statusText));
                }
            };
        });
    }
}
