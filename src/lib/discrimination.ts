import { CustomError } from "./error";
import { Assert } from "./assert";

/**
 * Use when an input doesn't adhere to a required spec
 */
export class MalformedExpressionException extends CustomError {}

declare const emailDisc: unique symbol;
/**
 * A nominal string type for emails
 */
export type Email = string & {
  readonly [emailDisc]: unique symbol;
};

export class InvalidEmailException extends MalformedExpressionException {}

export namespace Email {
  /**
   * RFC 5322 email validation
   * * https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
   * * https://stackoverflow.com/a/201378/6698132
   * * https://emailregex.com/
   * * https://www.ietf.org/rfc/rfc5322.txt
   * @JavaScript
   * @warn Not very restrictive; only checks syntax
   */
  export const roughValidate = (str: string): str is Email => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(
      str
    );
  };

  /**
   * Assert using RFC 5322 email validation
   * @JavaScript
   * @throws {@linkcode InvalidEmailException}
   * @warn Not restrictive; see {@linkcode roughValidate}
   */
  export const roughAssert = (str: string): asserts str is Email => {
    Assert(roughValidate(str), InvalidEmailException);
  };
}
