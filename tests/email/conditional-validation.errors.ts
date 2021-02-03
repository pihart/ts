import { Email } from "../../src";

declare const fn: (eml: Email) => void;
declare const fn2: (eml: Email) => void;

const unchecked = "";

if (Email.roughValidate(unchecked)) {
  fn(unchecked);
} else {
  // THROWS Argument of type 'string' is not assignable to parameter of type 'Email'
  fn2(unchecked);
}
