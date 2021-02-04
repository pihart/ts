export type IsSubType<A, B> = A extends B ? true : false;
export type SubType<A, B> = IsSubType<A, B> extends true ? A : never;
