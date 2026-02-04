export const filterItemsNotInOther = <T>(
    items: ReadonlyArray<T>,
    predicate: (item: T) => boolean
) => {
    return items.filter(predicate)
}