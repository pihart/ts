import { Email } from "../../src";

declare const fn: (eml: Email) => void;

const unchecked = "";
const casted = unchecked as Email;
const ok: Email = casted;

fn(casted);
