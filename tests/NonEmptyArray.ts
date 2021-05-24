import { NonEmptyArray } from "../src";

/**
 * @Test Empty array is not NonEmptyArray
 */
{
  // @ts-expect-error 2322
  const a: NonEmptyArray<string> = [];

  // @ts-expect-error 2322
  const b: NonEmptyArray<any> = [];

  // @ts-expect-error 2322
  const c: NonEmptyArray<unknown> = [];

  // @ts-expect-error 2322
  const d: NonEmptyArray<undefined> = [];
}

/**
 * @Test Non-empty arrays are NonEmptyArray
 */
{
  const a: NonEmptyArray<string> = [""];

  const b: NonEmptyArray<any> = [""];

  const c: NonEmptyArray<unknown> = [""];

  const d: NonEmptyArray<undefined> = [undefined];
}
