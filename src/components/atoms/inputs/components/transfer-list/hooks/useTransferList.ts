import { useMemo, useState } from "react"
import type { TransferItem } from "../components/transfer-list-box"

export interface UseTransferListProps<T> {
    value: Array<T>
    items: Array<TransferItem<T>>
    onChange?: (next: Array<T>) => void
}

export const useTransferList = <T,>({ value, items, onChange }: UseTransferListProps<T>) => {
    const [leftChecked, setLeftChecked] = useState<Set<T>>(new Set())
    const [rightChecked, setRightChecked] = useState<Set<T>>(new Set())
    const [seenItems, setSeenItems] = useState<Map<T, TransferItem<T>>>(new Map())

    useMemo(() => {
        setSeenItems((prev) => {
            const next = new Map(prev)
            let changed = false;

            for (const item of items) {
                if (!next.has(item.id)) {
                    next.set(item.id, item)
                    changed = true
                }
            }

            return changed ? next : prev
        })
    }, [items])

    const selectedSet = useMemo(() => new Set(value), [value])

    const leftItems = useMemo(
        () => items.filter((i) => !selectedSet.has(i.id)),
        [items, selectedSet],
    )

    const rightItems = useMemo(
        () => value.map((id) => seenItems.get(id)).filter(Boolean) as TransferItem<T>[],
        [value, seenItems],
    )

    const leftCheckedVisible = useMemo(
        () => new Set([...leftChecked].filter((id) => leftItems.some((i) => i.id === id))),
        [leftChecked, leftItems],
    )

    const toggle = (side: 'left' | 'right', id: T, itemDisabled?: boolean) => {
        if (itemDisabled) return

        const set = side === 'left' ? leftChecked : rightChecked
        const next = new Set(set)

        if (next.has(id)) next.delete(id)
        else next.add(id)

        if (side === 'left') setLeftChecked(next)
        else setRightChecked(next)
    }

    const moveRight = () => {
        const ids = Array.from(leftChecked)
        if (!ids.length) return
        const movable = ids.filter((id) => !seenItems.get(id)?.disabled)
        if (!movable.length) return
        onChange?.([...value, ...movable])
        setLeftChecked(new Set())
    }

    const moveLeft = () => {
        const ids = Array.from(rightChecked)
        if (!ids.length) return

        const movable = ids.filter((id) => !seenItems.get(id)?.disabled)
        if (!movable.length) return

        const remove = new Set(movable)

        onChange?.(value.filter((id) => !remove.has(id)))

        setRightChecked(new Set())
    }

    const moveAllRight = () => {
        const movable = leftItems.filter((i) => !i.disabled).map((i) => i.id)
        if (!movable.length) return
        onChange?.([...value, ...movable])
        setLeftChecked(new Set())
    }

    const moveAllLeft = () => {
        const movable = rightItems.filter((i) => !i.disabled).map((i) => i.id)
        if (!movable.length) return
        const remove = new Set(movable)
        onChange?.(value.filter((id) => !remove.has(id)))
        setRightChecked(new Set())
    }

    return {
        leftChecked: leftCheckedVisible,
        rightChecked,
        leftItems,
        rightItems,
        moveRight,
        moveAllRight,
        moveLeft,
        moveAllLeft,
        toggle,
    }
}