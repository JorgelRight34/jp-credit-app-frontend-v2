import clsx from 'clsx'
import Paragraph from '../../text/paragraph'
import FormLabel from '../../form-label/form-label'
import Checkbox from '../checkbox/checkbox'

export type TransferItem = {
  id: string
  label: string
  disabled?: boolean
}

interface TransferListBoxProps {
  title: string
  items: Array<TransferItem>
  checked: Set<string>
  disabled?: boolean
  subtitle?: string
  className?: string
  headerClassName?: string
  subtitleClassName?: string
  onToggle: (id: string, item: TransferItem) => void
}

const TransferListBox = ({
  title,
  subtitle,
  items,
  className,
  subtitleClassName,
  headerClassName,
  checked,
  disabled,
  onToggle,
}: TransferListBoxProps) => {
  return (
    <div className={clsx('flex flex-col h-full', className)}>
      <div
        className={clsx(
          'flex-shrink-0 border overflow-hidden p-3 rounded-t-xl',
          headerClassName,
        )}
      >
        {title} <span style={{ opacity: 0.6 }}>({items.length})</span>
        <Paragraph className={subtitleClassName}>{subtitle}</Paragraph>
      </div>
      <div className="flex flex-1 border-x border-b rounded-b-xl overflow-hidden">
        <div className="bg-white w-full !max-h-[20rem] overflow-y-auto">
          {items.map((item) => {
            const isDisabled = !!disabled || !!item.disabled

            return (
              <FormLabel
                key={item.id}
                className={clsx('flex !p-2 items-center hover:bg-stone-100', {
                  'opacity-50 cursor-not-allowed': isDisabled,
                })}
              >
                <Checkbox
                  checked={checked.has(item.id)}
                  disabled={isDisabled}
                  onChange={() => onToggle(item.id, item)}
                />
                <span>{item.label}</span>
              </FormLabel>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TransferListBox
