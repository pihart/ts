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
    static async loadJSON(filePath) {
        const xhr = await Network.fetch(filePath, {
            prerequest: (xhr) => {
                xhr.overrideMimeType("application/json");
                xhr.responseType = "json";
            },
        });
        return xhr.response;
    }
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
