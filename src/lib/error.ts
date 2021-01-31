/**
 * Sets a custom name for Error via constructor.
 * Extend this if you want custom names in errors.
 *
 * @JavaScript
 * @warn If you have a minifier that minifies the name of the extending class,
 * this will set the name to the minified name.
 */
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * CustomError which stores `public code: number`
 */
export class ErrorWithCode extends CustomError {
  /**
   * @param code `public code`
   * @param message passed to super
   */
  constructor(public code: number, message: string) {
    super(message);
  }
}

export class AssertionError extends CustomError {}
