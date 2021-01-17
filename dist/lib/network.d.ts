import { ErrorWithCode } from "./error";
declare type Predicate<T> = (value: T) => boolean;
export declare class HTTPError extends ErrorWithCode {
    constructor(code?: number, message?: string);
}
export declare class ResourceNotFoundException extends HTTPError {
    constructor(code?: number, message?: string);
}
export declare class Network {
    static loadJSON(filePath: string): Promise<any>;
    static fetch(url: string, prerequest?: (xhr: XMLHttpRequest) => void, method?: string, body?: null, resolveCondition?: Predicate<number>): Promise<XMLHttpRequest>;
}
export {};
