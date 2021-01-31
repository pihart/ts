/**
 * Sets a custom name for Error via constructor.
 * Extend this if you want custom names in errors.
 *
 * @JavaScript
 * @warn If you have a minifier that minifies the name of the extending class,
 * this will set the name to the minified name.
 */
export declare class CustomError extends Error {
    constructor(message: string);
}
/**
 * CustomError which stores `public code: number`
 */
export declare class ErrorWithCode extends CustomError {
    code: number;
    /**
     * @param code `public code`
     * @param message passed to super
     */
    constructor(code: number, message: string);
}
export declare class AssertionError extends CustomError {
}
