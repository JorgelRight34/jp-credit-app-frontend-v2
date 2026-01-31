import { useMemo, useState } from 'react'

export type TransferItem = {
  id: string
  label: string
  disabled?: boolean
}

type TransferListProps = {
  items: Array<TransferItem>
  value: Array<string>
  leftTitle?: string
  rightTitle?: string
  disabled?: boolean
  className?: string
  onChange?: (next: Array<string>) => void
}

const TransferList = ({
  items,
  value = [],
  onChange,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  disabled,
  className,
}: TransferListProps) => {
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
    if (disabled || itemDisabled) return

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
    if (disabled) return

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
    if (disabled) return

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
    if (disabled) return
    const movable = leftItems.filter((i) => !i.disabled).map((i) => i.id)
    if (!movable.length) return
    onChange?.([...value, ...movable])
    setLeftChecked(new Set())
  }

  const moveAllLeft = () => {
    if (disabled) return
    const movable = rightItems.filter((i) => !i.disabled).map((i) => i.id)
    if (!movable.length) return
    const remove = new Set(movable)
    onChange?.(value.filter((id) => !remove.has(id)))
    setRightChecked(new Set())
  }

  return (
    <div
      className={className}
      style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr auto 1fr' }}
    >
      <ListBox
        title={leftTitle}
        items={leftItems}
        checked={leftChecked}
        onToggle={(id, item) => toggle('left', id, item.disabled)}
        disabled={disabled}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={moveRight}
          disabled={disabled || leftChecked.size === 0}
        >
          &gt;
        </button>
        <button
          type="button"
          onClick={moveLeft}
          disabled={disabled || rightChecked.size === 0}
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={moveAllRight}
          disabled={disabled || leftItems.every((i) => i.disabled)}
        >
          &gt;&gt;
        </button>
        <button
          type="button"
          onClick={moveAllLeft}
          disabled={disabled || rightItems.every((i) => i.disabled)}
        >
          &lt;&lt;
        </button>
      </div>

      <ListBox
        title={rightTitle}
        items={rightItems}
        checked={rightChecked}
        onToggle={(id, item) => toggle('right', id, item.disabled)}
        disabled={disabled}
      />
    </div>
  )
}

const ListBox = ({
  title,
  items,
  checked,
  disabled,
  onToggle,
}: {
  title: string
  items: Array<TransferItem>
  checked: Set<string>
  disabled?: boolean
  onToggle: (id: string, item: TransferItem) => void
}) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 10,
        minHeight: 220,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        {title} <span style={{ opacity: 0.6 }}>({items.length})</span>
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((item) => {
          const isChecked = checked.has(item.id)
          const isDisabled = !!disabled || !!item.disabled

          return (
            <label
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => onToggle(item.id, item)}
              />
              <span>{item.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default TransferList
