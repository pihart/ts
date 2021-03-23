import { CustomError } from "./error";

export class AssertionError extends CustomError {}

/**
 * Asserts {@param bool}
 * @param errorConstructor A constructor for the thrown error class
 * @throws {@param errorConstructor}
 */
export function Assert(
  bool: boolean,
  errorConstructor: new () => Error = AssertionError
): asserts bool {
  if (bool) return;
  throw new errorConstructor();
}
