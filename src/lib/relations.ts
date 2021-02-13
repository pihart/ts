export type PartialRecord<A extends keyof any, B> = Partial<Record<A, B>>;

/**
 * A function {@typeparam BaseSet}^2 --> {@TypeParam ValueSet}
 *
 * Assigns a member of {@typeparam ValueSet} to each member of {@typeparam BaseSet}^2
 */
export type Matrix<BaseSet extends keyof any, ValueSet> = Record<
  BaseSet,
  Record<BaseSet, ValueSet>
>;

/**
 * A partial function {@typeparam BaseSet}^2 ~~> {@TypeParam ValueSet}
 *
 * Optionally assigns a member of {@typeparam ValueSet} to each member of {@typeparam BaseSet}^2
 */
export type PartialMatrix<BaseSet extends keyof any, ValueSet> = PartialRecord<
  BaseSet,
  PartialRecord<BaseSet, ValueSet>
>;

/**
 * Encodes multiple (not necessarily symmetric) relations of members of {@typeparam BaseSet}
 *
 * For each member of {@typeparam BaseSet}, allows to write in which members of {@typeparam ValueSet}
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
