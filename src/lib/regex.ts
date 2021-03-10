/**
 * Accepts strings matching
 * `/^[BaseSet]*$/`
 */
export interface KleeneStarDFA<BaseSet extends string> {
  startState: "0";
  acceptStates: "0";
  transitions: {
    "0": Record<BaseSet, "0"> & Record<string, "fail">;
    fail: Record<string, "fail">;
  };
}

/**
 * Accepts strings matching
 * `/^[BaseSet]+$/`
 */
export interface KleenePlusDFA<BaseSet extends string> {
  startState: "0";
  acceptStates: "1";
  transitions: {
    "0": Record<BaseSet, "1"> & Record<string, "fail">;
    "1": Record<BaseSet, "1"> & Record<string, "fail">;
    fail: Record<string, "fail">;
  };
}

