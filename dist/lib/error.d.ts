export declare class CustomError extends Error {
    constructor(message: string);
}
export declare class ErrorWithCode extends CustomError {
    code: number;
    constructor(code: number, message: string);
}
export declare class AssertionError extends CustomError {
}
