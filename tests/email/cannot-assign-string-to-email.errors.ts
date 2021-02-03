import { Email } from "../../src";

// THROWS Type 'string' is not assignable to type 'Email'
const failInvalid: Email = "";

// Error because no assertion is being done
// THROWS Type 'string' is not assignable to type 'Email'
const failValid: Email = "example@example.com";
