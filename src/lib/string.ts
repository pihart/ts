import { DFAAccepts } from "./dfa";
import { KleenePlusDFA, KleeneStarDFA } from "./regex";

type A_Z_Upper =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type A_Z_Lower = Lowercase<A_Z_Upper>;

/**
 * A character matching
 * `/^[a-zA-Z]$/`
 */
export type AlphaChar = A_Z_Upper | A_Z_Lower;

/**
 * Accepts strings matching
 * `/^[a-zA-Z]*$/`
 */
type AlphaDFA = KleeneStarDFA<AlphaChar>;

/**
 * Accepts strings matching
 * `/^[a-zA-Z]+$/`
 */
type NonEmptyAlphaDFA = KleenePlusDFA<AlphaChar>;

/**
 * Does {@typeparam T} match `/^[a-zA-Z]*$/`?
 * That is, is it a string composed of only English letters?
 *
 * Type `true`, `false`, or `never`.
 * Will broaden to `boolean` if you pass a union type where at least one gives `true` and one gives `false`.
 */
export type IsAlpha<T extends string> = DFAAccepts<AlphaDFA, T>;

/**
 * Does {@typeparam T} match `/^[a-zA-Z]+$/`?
 * That is, is it a non-empty string composed of only English letters?
 *
 * Type `true`, `false`, or `never`.
 * Will broaden to `boolean` if you pass a union type where at least one gives `true` and one gives `false`.
 */
export type IsNonEmptyAlpha<T extends string> = DFAAccepts<NonEmptyAlphaDFA, T>;

/**
 * Arabic numerals (base 10 digits)
 */
export type NumChar = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
/**
 * Arabic numerals (base 10 digits)
 */
export type Digit = NumChar;

/**
 * A character matching
 * `/^[a-zA-Z\d]$/`
 */
export type AlphaNumChar = AlphaChar | NumChar;

type AlphaNumDFA = KleeneStarDFA<AlphaNumChar>;
type NonEmptyAlphaNumDFA = KleenePlusDFA<AlphaNumChar>;

/**
 * Does {@typeparam T} match `/^[a-zA-Z\d]*$/`?
 * That is, is it a string composed of only English letters and Arabic numerals?
 *
 * Type `true`, `false`, or `never`.
 * Will broaden to `boolean` if you pass a union type where at least one gives `true` and one gives `false`.
 */
export type IsAlphaNum<T extends string> = DFAAccepts<AlphaNumDFA, T>;

/**
 * Does {@typeparam T} match `/^[a-zA-Z\d]+$/`?
 * That is, is it a non-empty string composed of only English letters and Arabic numerals?
 *
 * Type `true`, `false`, or `never`.
 * Will broaden to `boolean` if you pass a union type where at least one gives `true` and one gives `false`.
 */
export type IsNonEmptyAlphaNum<T extends string> = DFAAccepts<
  NonEmptyAlphaNumDFA,
  T
>;
