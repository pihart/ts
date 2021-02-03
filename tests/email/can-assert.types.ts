import { Email } from "../../src";

const unchecked = "";

const assert: typeof Email.roughAssert = Email.roughAssert;
assert(unchecked);

const checked: Email = unchecked;
