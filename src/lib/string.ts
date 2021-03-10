import { DFAAccepts } from "./dfa";

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
interface AlphaDFA {
  startState: "0";
  acceptStates: "0";
  transitions: {
    "0": Record<AlphaChar, "0"> & Record<string, "fail">;
    fail: Record<string, "fail">;
  };
}

/**
 * Accepts strings matching
 * `/^[a-zA-Z]+$/`
 */
interface NonEmptyAlphaDFA {
  startState: "0";
  acceptStates: "1";
  transitions: {
    "0": Record<AlphaChar, "1"> & Record<string, "fail">;
    "1": Record<AlphaChar, "1"> & Record<string, "fail">;
    fail: Record<string, "fail">;
  };
}

/**
 * Does {@typeparam T} match `/^[a-zA-Z]*$/`?
 * That is, is it a string composed of only English letters.
 *
 * Type `true` or type `false`.
 * Will broaden to `boolean` if you pass a union type where not all have the same value.
 */
export type IsAlpha<T extends string> = DFAAccepts<AlphaDFA, T>;

/**
 * Does {@typeparam T} match `/^[a-zA-Z]+$/`?
 * That is, is it a non-empty string composed of only English letters.
 *
 * Type `true` or type `false`.
 * Will broaden to `boolean` if you pass a union type where not all have the same value.
 */
export type IsNonEmptyAlpha<T extends string> = DFAAccepts<NonEmptyAlphaDFA, T>;
