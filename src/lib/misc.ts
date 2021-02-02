export type Async<T = void> = T | Promise<T> | PromiseLike<T>;
export type Predicate<T> = (value: T) => boolean;

/**
 * Arrays with at least one element
 *
 * @typeparam T The type of the first element
 * @typeparam U The type of the remaining elements, if different from T
 *
 * @warn Typescript ^4.1.3 allows you to pull off elements from empty arrays, even with strict mode enabled.
 * This mainly protects arguments to functions.
 */
export type NonEmptyArray<T, U = T> = [T, ...U[]];
