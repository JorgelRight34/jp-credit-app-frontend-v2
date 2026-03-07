import { useMemo, useState } from "react"
import type { TransferItem } from "./transfer-list-box"

export interface UseTransferListProps {
    value: Array<string>
    items: Array<TransferItem>
    onChange?: (next: Array<string>) => void
}

export const useTransferList = ({ value, items, onChange }: UseTransferListProps) => {
    const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set())
    const [rightChecked, setRightChecked] = useState<Set<string>>(new Set())

    const selectedSet = useMemo(() => new Set(value), [value])

    const leftItems = useMemo(
        () => items.filter((i) => !selectedSet.has(i.id)),
        [items, selectedSet],
    )

    const rightItems = useMemo(
        () => items.filter((i) => selectedSet.has(i.id)),
        [items, selectedSet],
    )

    const toggle = (
        side: 'left' | 'right',
        id: string,
        itemDisabled?: boolean,
    ) => {
        if (itemDisabled) return

        const set = side === 'left' ? leftChecked : rightChecked
        const next = new Set(set)

        if (next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }

        if (side === 'left') {
            setLeftChecked(next)
        } else {
            setRightChecked(next)
        }
    }

    const moveRight = () => {
        const ids = Array.from(leftChecked)
        if (!ids.length) return

        const movable = ids.filter(
            (id) => !items.find((x) => x.id === id)?.disabled,
        )
        if (!movable.length) return

        onChange?.([...value, ...movable])
        setLeftChecked(new Set())
    }

    const moveLeft = () => {
        const ids = Array.from(rightChecked)
        if (!ids.length) return

        const movable = ids.filter(
            (id) => !items.find((x) => x.id === id)?.disabled,
        )
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

    return { leftChecked, rightChecked, leftItems, rightItems, moveRight, moveAllRight, moveLeft, moveAllLeft, toggle, }
}