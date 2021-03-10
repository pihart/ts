import { Email } from "../../src";

// @ts-expect-error 2322
const failInvalid: Email = "";

// Error because no assertion is being done
// @ts-expect-error 2322
const failValid: Email = "example@example.com";

const assert: typeof Email.roughAssert = Email.roughAssert;
assert(failValid);

const checked: Email = failValid;
