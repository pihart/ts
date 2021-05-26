import { TestedType } from "./misc";

/**
 * Type `true` if {@typeparam A} is a subtype of {@typeparam B};
 * otherwise type `false`.
 *
 * @see [[`IsEqual`]] for a bidirectional variant.
 * @see [[`RequireSubType`]] for a stricter variant.
 */
export type IsSubType<A, B> = A extends B ? true : false;

/**
 * Type {@typeparam A} if {@typeparam A} is a subtype of {@typeparam B};
 * otherwise type `never`.
 */
export type SubType<A, B> = TestedType<A, IsSubType<A, B>>;

/**
 * A stricter version of [[`IsSubType`]].
 * Type `true` if {@typeparam A} is a subtype of {@typeparam B};
 * compile-time error otherwise.
 */
export type RequireSubType<A extends B, B> = IsSubType<A, B>;

/**
 * Type `true` if {@typeparam A} :< {@typeparam B} && {@typeparam B} :< {@typeparam A}
 *
 * @see [[`IsSubType`]] for a unidirectional variant.
 * @see [[`RequireEqual`]] for a stricter variant.
 */
export type IsEqual<A, B> = IsSubType<true, IsSubType<A, B> & IsSubType<B, A>>;

/**
 * Requires {@typeparam C} :< [[`IsSubType`]]`<A, B>`;
 * otherwise issues a compile-time error.
 * Has value equal to `IsSubType<A, B>`.
 *
 * @warn
 * Misbehaves for `<never, never, true>`:
 * errors out though it should be valid.
 * This is a false negative, and the only one I can find.
 * I conjecture there are no false positives.
 */
export type RequireEqual<A, B, C extends IsEqual<A, B>> = IsEqual<A, B>;
