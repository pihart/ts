// From https://github.com/microsoft/TypeScript/issues/6579#issuecomment-710776922
// https://glitch.com/~efficacious-valley-repair
// https://github.com/AnyhowStep/efficacious-valley-repair/tree/main/app

type Head<StrT extends string> = StrT extends `${infer HeadT}${string}`
  ? HeadT
  : never;

type Tail<StrT extends string> = StrT extends `${string}${infer TailT}`
  ? TailT
  : never;

export interface DFA {
  startState: string;
  acceptStates: string;
  transitions: Record<string, Record<string, string>>;
}

type AcceptsImpl<
  DfaT extends DFA,
  StateT extends string,
  InputT extends string
> = InputT extends ""
  ? StateT extends DfaT["acceptStates"]
    ? true
    : false
  : AcceptsImpl<DfaT, DfaT["transitions"][StateT][Head<InputT>], Tail<InputT>>;

/**
 * Does {@typeparam DfaT} accept {@typeparam InputT}?
 *
 * Type `true`, `false`, or `never`.
 * Will broaden to `boolean` if you pass a union type where at least one gives `true` and one gives `false`.
 */
export type DFAAccepts<DfaT extends DFA, InputT extends string> = AcceptsImpl<
  DfaT,
  DfaT["startState"],
  InputT
>;
