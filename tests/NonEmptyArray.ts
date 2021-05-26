import { IsSubType, NonEmptyArray, RequireEqual } from "../src";

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

  type Type<T> = RequireEqual<IsSubType<[], NonEmptyArray<T>>, false, true>;
}

/**
 * @Test Non-empty arrays are NonEmptyArray
 */
{
  const a: NonEmptyArray<string> = [""];

  const b: NonEmptyArray<any> = [""];

  const c: NonEmptyArray<unknown> = [""];

  const d: NonEmptyArray<undefined> = [undefined];

  type Type<T> = RequireEqual<IsSubType<[T], NonEmptyArray<T>>, true, true>;
}
