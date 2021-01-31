import { ErrorWithCode } from "./error";
declare type Predicate<T> = (value: T) => boolean;
export declare class HTTPError extends ErrorWithCode {
    constructor(code?: number, message?: string);
}
export declare class ResourceNotFoundException extends HTTPError {
    constructor(code?: number, message?: string);
}
export interface NetworkOptions {
    prerequest: (xhr: XMLHttpRequest) => void;
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    body?: Document | BodyInit | null;
    resolveCondition: Predicate<XMLHttpRequest>;
}
export declare class Network {
    static loadJSON(filePath: string): Promise<any>;
    static fetch(url: string, { prerequest, method, body, resolveCondition, }?: Partial<NetworkOptions>): Promise<XMLHttpRequest>;
}
export {};
