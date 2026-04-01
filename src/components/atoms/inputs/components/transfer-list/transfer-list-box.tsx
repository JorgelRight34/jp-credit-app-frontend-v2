import clsx from 'clsx'
import Paragraph from '../../../text/paragraph'
import FormLabel from '../../../form-label/form-label'
import Checkbox from '../checkbox/checkbox'

export type TransferItem<T> = {
  id: T
  label: string
  disabled?: boolean
}

interface TransferListBoxProps<T> {
  title: string
  items: Array<TransferItem<T>>
  checked: Set<T>
  disabled?: boolean
  subtitle?: string
  className?: string
  headerClassName?: string
  subtitleClassName?: string
  onToggle: (id: T, item: TransferItem<T>, disabled?: boolean) => void
}

const TransferListBox = <T,>({
  title,
  subtitle,
  items,
  className,
  subtitleClassName,
  headerClassName,
  checked,
  disabled,
  onToggle,
}: TransferListBoxProps<T>) => {
  return (
    <div className={clsx('flex h-full flex-col', className)}>
      <div
        className={clsx(
          'text-secondary flex-shrink-0 overflow-hidden rounded-t-xl border p-3',
          headerClassName,
        )}
      >
        {title} <span style={{ opacity: 0.6 }}>({items.length})</span>
        <Paragraph className={subtitleClassName}>{subtitle}</Paragraph>
      </div>
      <div className="bg-surface flex min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-b-xl border-x border-b">
        {items.map((item) => {
          const isDisabled = !!disabled || !!item.disabled

          return (
            <FormLabel
              key={item.id as string}
              className={clsx('bg-input-hover flex items-center !p-2', {
                'cursor-not-allowed opacity-50': isDisabled,
              })}
            >
              <Checkbox
                checked={checked.has(item.id)}
                disabled={isDisabled}
                onChange={() => onToggle(item.id, item, isDisabled)}
              />
              <span>{item.label}</span>
            </FormLabel>
          )
        })}
      </div>
    </div>
  )
}

export default TransferListBox
