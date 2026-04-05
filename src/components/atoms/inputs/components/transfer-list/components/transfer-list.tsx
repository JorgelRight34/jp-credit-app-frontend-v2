import clsx from 'clsx'
import { LightBtn } from '../../../../button'
import TransferListBox from './transfer-list-box'
import { useTransferList } from '../hooks/useTransferList'
import type { UseTransferListProps } from '../hooks/useTransferList'

type TransferListProps<T = object> = UseTransferListProps<T> & {
  leftTitle?: string
  leftSubtitle?: string
  rightTitle?: string
  rightSubtitle?: string
  disabled?: boolean
  className?: string
}

const TransferList = <T,>({
  leftTitle = 'Disponibles',
  rightTitle = 'Seleccionados',
  rightSubtitle,
  leftSubtitle,
  disabled,
  className,
  ...config
}: TransferListProps<T>) => {
  const {
    leftItems,
    leftChecked,
    rightItems,
    rightChecked,
    moveRight,
    moveLeft,
    moveAllLeft,
    moveAllRight,
    toggle,
  } = useTransferList(config)

  const transferListClassName = clsx(
    'h-full min-h-0 w-full md:w-7/15 overflow-y-auto',
    className,
  )

  return (
    <div className={clsx('flex flex-1 flex-col md:flex-row')}>
      <div className={transferListClassName}>
        <TransferListBox
          title={leftTitle}
          subtitle={leftSubtitle}
          headerClassName="bg-surface-subtle"
          items={leftItems}
          checked={leftChecked}
          onToggle={(id, item) => toggle('left', id, item.disabled)}
          disabled={disabled}
        />
      </div>

      <div className="flex h-full flex-row items-center justify-center gap-4 px-3 py-3 md:w-1/14 md:flex-col md:gap-8 md:py-0">
        <LightBtn
          onClick={moveRight}
          disabled={disabled || leftChecked.size === 0}
        >
          <span className="md:hidden">&#x2193;</span>
          <span className="hidden md:inline">&gt;</span>
        </LightBtn>
        <LightBtn
          onClick={moveLeft}
          disabled={disabled || rightChecked.size === 0}
        >
          <span className="md:hidden">&#x2191;</span>
          <span className="hidden md:inline">&lt;</span>
        </LightBtn>
        <LightBtn
          onClick={moveAllRight}
          disabled={disabled || leftItems.every((i) => i.disabled)}
        >
          <span className="md:hidden">&#x21CA;</span>
          <span className="hidden md:inline">&gt;&gt;</span>
        </LightBtn>
        <LightBtn
          type="button"
          onClick={moveAllLeft}
          disabled={disabled || rightItems.every((i) => i.disabled)}
        >
          <span className="md:hidden">&#x21C8;</span>
          <span className="hidden md:inline">&lt;&lt;</span>
        </LightBtn>
      </div>

      <div className={transferListClassName}>
        <TransferListBox
          title={rightTitle}
          subtitle={rightSubtitle}
          headerClassName="bg-accent"
          subtitleClassName="text-light"
          items={rightItems}
          checked={rightChecked}
          onToggle={(id, item) => toggle('right', id, item.disabled)}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default TransferList
