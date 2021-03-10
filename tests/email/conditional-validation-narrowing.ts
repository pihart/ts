import { Email } from "../../src";

declare const fn: (eml: Email) => void;

const unchecked = "";
{
  // @ts-expect-error 2345
  fn(unchecked);
}

{
  if (Email.roughValidate(unchecked)) {
    fn(unchecked);
  } else {
    // @ts-expect-error 2345
    fn(unchecked);
  }
}
