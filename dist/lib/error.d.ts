export default class CustomError extends Error {
    constructor(message: string);
}
export declare class ErrorWithCode extends CustomError {
    code: number;
    constructor(code: number, message: string);
}
