export type PartialRecord<A extends keyof any, B> = Partial<Record<A, B>>;

/**
 * A function {@typeparam BaseSet}^2 --> {@TypeParam ValueSet}
 *
 * Assigns a member of {@typeparam ValueSet} to each member of {@typeparam BaseSet}^2
 *
 * Use double array syntax to extract members:
 * ```js
 * matrix[X][Y]
 * ```
 *
 * @example
 * ```ts
 * const matrix: Matrix<0 | 1 | 2, "normal" | "special"> = {
 *   0: {
 *     0: "special",
 *     1: "special",
 *     2: "normal",
 *   },
 *   1: {
 *     0: "normal",
 *     1: "normal",
 *     2: "special",
 *   },
 *   2: {
 *     0: "normal",
 *     1: "normal",
 *     2: "normal",
 *   },
 * };
 * ```
 * However, if there is a reasonable default member of `ValueSet`, a [[`PartialMatrix`]] may be a better solution.
 */
export type Matrix<BaseSet extends keyof any, ValueSet> = Record<
  BaseSet,
  Record<BaseSet, ValueSet>
>;

/**
 * A partial function {@typeparam BaseSet}^2 ~~> {@TypeParam ValueSet}
 *
 * Optionally assigns a member of {@typeparam ValueSet} to each member of {@typeparam BaseSet}^2.
 *
 * Use optional double array syntax to extract members:
 * ```js
 * matrix[X]?.[Y]
 * ```
 *
 * @example
 * ```ts
 * const partialMatrix: PartialMatrix<0 | 1 | 2, "special"> = {
 *   0: {
 *     0: "special",
 *     1: "special",
 *   },
 *   1: {
 *     2: "special",
 *   },
 * };
 * ```
 * Contrast this with the implementation using the non-partial [[`Matrix`]].
 * However, in this case, you could also likely write
 * ```ts
 * const specials = {
 *   0: [0, 1],
 *   1: [2],
 * };
 * ```
 * This type is far more useful when you have more than 2 values for your function,
 * in this case `normal`, `more`, and `less`:
 * ```ts
 * const partialMatrix: PartialMatrix<0 | 1 | 2, "more" | "less"> = {
 *   0: {
 *     0: "more",
 *     1: "less",
 *   },
 *   1: {
 *     2: "less",
 *   },
 *   2: {
 *     2: "more",
 *   },
 * };
 */
export type PartialMatrix<BaseSet extends keyof any, ValueSet> = PartialRecord<
  BaseSet,
  PartialRecord<BaseSet, ValueSet>
>;

/**
 * Encodes multiple (not necessarily symmetric) relations of members of {@typeparam BaseSet}
 *
 * For each member of {@typeparam BaseSet},
 * allows to write in which members of {@typeparam ValueSet} apply between it and another member,
 * then enumerates each satisfying pair.
 *
 * Use object-relation syntax to extract members:
 * ```js
 * invMatrix[X]["rel1"]
 * ```
 *
 * @example
 * A symmetric example
 * ```ts
 * const invMatrix: InvertedMatrix<0 | 1 | 2, "neighbors" | "friends"> = {
 *   0: {
 *     neighbors: [2],
 *   },
 *   1: {
 *     friends: [2],
 *     neighbors: [0, 2],
 *   },
 *   2: {
 *     friends: [1],
 *     neighbors: [0, 1],
 *   },
 * };
 * ```
 *
 * @example
 * An asymmetric example
 * ```ts
 * const invMatrix: InvertedMatrix<0 | 1 | 2, "strongerThan" | "heavierThan"> = {
 *  0: {
 *    strongerThan: [2],
 *    heavierThan: [1, 2],
 *  },
 *  1: {
 *    strongerThan: [0, 2],
 *    heavierThan: [2],
 *  },
 *  2: {},
 * };
 * ```
 *
 * @example
 * A silly example
 * ```ts
 * const invMatrix: InvertedMatrix<0 | 1 | 2, "normal" | "special"> = {
 *   0: {
 *     normal: [2],
 *     special: [1, 0],
 *   },
 *   1: {
 *     normal: [0, 1],
 *     special: [2],
 *   },
 *   2: {
 *     normal: [0, 1, 2],
 *   },
 * };
 * ```
 * This is silly because it seems there are only two options, `normal` and `special`.
 * If that's true, just record pairs where it is `special`:
 * ```ts
 * const invMatrix: InvertedMatrix<0 | 1 | 2, "special"> = {
 *   0: {
 *     special: [0, 1],
 *   },
 *   1: {
 *     special: [2],
 *   },
 *   2: {},
 * };
 * ```
 * This is still not optimal, though, since it seems you know that only one relation exists for any ordered pair.
 * In that case, a [[`Matrix`]] or [[`PartialMatrix`]] should be used instead.
 *
 * @typeparam BaseSet The set to describe relations of
 * @typeparam ValueSet Contains the names of the relations
 */
export type InvertedMatrix<
  BaseSet extends keyof any,
  ValueSet extends keyof any
> = {
  [index in BaseSet]: PartialRecord<ValueSet, BaseSet[]>;
};
