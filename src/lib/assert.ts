import { CustomError } from "./error";

export class AssertionError extends CustomError {}

/**
 * Asserts `bool`
 * @throws `errorConstructor`
 */
export function Assert(
  bool: boolean,
  errorConstructor: new () => Error = AssertionError
): asserts bool {
  if (bool) return;
  throw new errorConstructor();
}
