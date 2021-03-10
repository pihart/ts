import { IsEmail } from "../../dist";

// https://gist.github.com/cjaoude/fd9910626629b53c4d25

type valid =
  | "bob@example.com"
  | "example@example.com"
  | "billy.bob.jones+example123@gmail.com"
  | "example@a.b.co"
  | "email@example.com"
  | "firstname.lastname@example.com"
  | "email@subdomain.example.com"
  | "firstname+lastname@example.com"
  | "email@123.123.123.123"
  | "email@[123.123.123.123]"
  | '"email"@example.com'
  | "1234567890@example.com"
  | "email@example-one.com"
  | "_______@example.com"
  | "email@example.name"
  | "email@example.museum"
  | "email@example.co.jp"
  | "firstname-lastname@example.com";

// Supposedly valid; not accepting
// | "much.”more\\ unusual”@example.com"
// | "very.unusual.”@”.unusual.com@example.com"

type invalid =
  | "example@example."
  | "example@example"
  | "billy.bob.jones+example123@gmail."
  | ".bob.jones+example123@gmail."
  | "example@a..co"
  | "@example.com"
  | "plainaddress"
  | "#@%^%#$@#$@#.com"
  | "Joe Smith <email@example.com>"
  | "email.example.com"
  | "email@example@example.com"
  | ".email@example.com"
  | "email.@example.com"
  | "email..email@example.com"
  | "あいうえお@example.com"
  | "email@example.com (Joe Smith)"
  | "email@example"
  | "email@-example.com"
  | "email@example..com"
  | "Abc..123@example.com";

// Supposedly invalid; not rejecting
// | "email@example.web"
// | "email@111.222.333.44444"

{
  // Could be true, false, boolean, never
  type ExpectTrue = IsEmail<valid>;

  // Make sure not false nor boolean
  // @ts-expect-error TS2322
  const a: ExpectTrue = false;

  // Make sure not false nor never
  const b: ExpectTrue = true;
}

{
  // Could be true, false, boolean, never
  type ExpectFalse = IsEmail<invalid>;

  // Make sure not true nor boolean
  // @ts-expect-error TS2322
  const a: ExpectFalse = true;

  // Make sure not true nor never
  const b: ExpectFalse = false;
}
