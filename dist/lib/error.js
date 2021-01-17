export class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
export class ErrorWithCode extends CustomError {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
export class AssertionError extends CustomError {
}
