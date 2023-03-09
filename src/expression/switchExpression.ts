/**
 * a fun hack for creating "switch state" type of logic in expressions. Useful
 * in some rare cases.
 *
 * Example:
 * ```js
 * console.log(switchExpression(
 *   "🚌", "No case for ",
 *   ["😴", "Sleeping"],
 *   ["🚌", "A bus"],
 *   ["🚗", "A car"]
 * ))
 * 
 * // Prints out: "A bus"
 * ```
 *
 * @param value Value to be compared.
 * @param defaultValue Default value for keeping the TS compiler happy.
 * @param cases Arbitary number of array parameters containing to values,
 *              the first one being the case, and the second one being the
 *              value to be returned.
 * @returns The value of the matched case.
 */
export default function switchExpression<Comparable, Value>(
    value: Comparable,
    defaultValue: Value,
    ...cases: [Comparable, Value][]
): Value {
    for (const c of cases) {
        if (value === c[0]) {
            return c[1];
        }
    }
    return defaultValue
}
