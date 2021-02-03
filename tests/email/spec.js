const { Email, InvalidEmailException } = require("../../dist");

const valid = [
  "bob@example.com",
  "example@example.com",
  "billy.bob.jones+example123@gmail.com",
  "example@a.b.co",
];
const invalid = [
  "example@example.",
  "example@example",
  "billy.bob.jones+example123@gmail.",
  ".bob.jones+example123@gmail.",
  "example@a..co",
  "@example.com",
];

valid.forEach((email) => {
  test(`Validates ${email}`, () =>
    expect(Email.roughValidate(email)).toBe(true));
  test(`Does not throw on assertion for ${email}`, () =>
    expect(() => Email.roughAssert(email)).not.toThrow());
});

invalid.forEach((email) => {
  test(`Rejects ${email}`, () =>
    expect(Email.roughValidate(email)).toBe(false));
  test(`Throws on assertion for ${email}`, () =>
    expect(() => Email.roughAssert(email)).toThrowError(InvalidEmailException));
});
