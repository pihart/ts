/**
 * Type `true` if {@typeparam A} is a subtype of {@typeparam B};
 * otherwise type `false`.
 */
import {TestedType} from "./misc";

export type IsSubType<A, B> = A extends B ? true : false;
/**
 * Type {@typeparam A} if {@typeparam A} is a subtype of {@typeparam B};
 * otherwise type `never`.
 */
export type SubType<A, B> = TestedType<A, IsSubType<A, B>>;
