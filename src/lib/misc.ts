/**
 * Types that unwrap (via `await` or `.then`) to {@typeparam T}
 *
 * @example An interface where functions are allowed to be asynchronous (`Promise`-returning),
 * but do not need to be
 */
export type Async<T = void> = T | Promise<T> | PromiseLike<T>;
export type Predicate<T> = (value: T) => boolean;

/**
 * Arrays with at least one element
 *
 * @warn Typescript ^4.1.3 allows you to pull off elements from empty arrays, even with strict mode enabled.
 * This utility mainly protects arguments to functions.
 *
 * @typeparam T The type of the first element
 * @typeparam U The type of the remaining elements, if different from {@typeparam T}
 */
export type NonEmptyArray<T, U = T> = [T, ...U[]];
