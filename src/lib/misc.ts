export type Async<T = void> = T | Promise<T>;
export type Predicate<T> = (value: T) => boolean;
