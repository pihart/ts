import { CustomError } from "./error";

/**
 * Use when an input doesn't adhere to a required spec
 */
export class MalformedExpressionException extends CustomError {}
