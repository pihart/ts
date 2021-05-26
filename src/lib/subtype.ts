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
 */
export type IsEqual<A, B> = IsSubType<true, IsSubType<A, B> & IsSubType<B, A>>;
