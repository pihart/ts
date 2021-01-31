import { ErrorWithCode } from "./error";
import { Predicate } from "./misc";
export declare class HTTPError extends ErrorWithCode {
    constructor(code?: number, message?: string);
}
export declare class ResourceNotFoundException extends HTTPError {
    constructor(code?: number, message?: string);
}
export interface NetworkOptions {
    /**
     * Execute before sending the XHR
     */
    prerequest: (xhr: XMLHttpRequest) => void;
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    body?: Document | BodyInit | null;
    /**
     * Determines when to resolve the Promise instead of rejecting
     */
    resolveCondition: Predicate<XMLHttpRequest>;
}
export declare class Network {
    /**
     * Fetch a network resource as JSON and return parsed
     *
     * @param filePath The network URL of file to be fetched
     * @return The resource as parsed JSON object
     *
     * @JavaScript
     */
    static loadJSON(filePath: string): Promise<any>;
    /**
     * `Promise` wrapper for `XMLHttpRequest`
     *
     * Use instead of `window.fetch` because it
     * gives easy control of execution order and
     * rejects failed transactions.
     *
     * @return The XHR as a Promise,
     * with a {@linkcode ResourceNotFoundException} in case of rejection
     *
     * @JavaScript
     */
    static fetch(url: string, { prerequest, method, body, resolveCondition, }?: Partial<NetworkOptions>): Promise<XMLHttpRequest>;
}
