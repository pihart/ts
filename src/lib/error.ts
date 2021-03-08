/**
 * Sets a custom name for `Error` via the `constructor` property.
 * Extend this if you want custom names in errors.
 *
 * @warn If you have a minifier that minifies the name of the extending class,
 * this will set the name to the minified name.
 */
export class CustomError extends Error {
  /**
   * @param message The error message
   */
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * {@linkcode CustomError} which stores `public code: number`
 */
export class ErrorWithCode extends CustomError {
  /**
   * @param code The (public) error code
   * @param message The error message
   */
  constructor(public code: number, message?: string) {
    super(message);
  }
}
