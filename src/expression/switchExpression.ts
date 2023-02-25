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
