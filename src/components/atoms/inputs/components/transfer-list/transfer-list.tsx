import clsx from 'clsx'
import { LightBtn } from '../../../button'
import TransferListBox from './transfer-list-box'
import { useTransferList } from './useTransferList'
import type { UseTransferListProps } from './useTransferList'

type TransferListProps = UseTransferListProps & {
  leftTitle?: string
  leftSubtitle?: string
  rightTitle?: string
  rightSubtitle?: string
  disabled?: boolean
  className?: string
}

const TransferList = ({
  leftTitle = 'Disponibles',
  rightTitle = 'Seleccionados',
  rightSubtitle,
  leftSubtitle,
  disabled,
  className,
  ...config
}: TransferListProps) => {
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

  return (
    <div className={clsx('flex flex-col md:flex-row', className)}>
      <div className="w-full md:w-7/15">
        <TransferListBox
          title={leftTitle}
          subtitle={leftSubtitle}
          className="h-full"
          headerClassName="bg-surface-subtle"
          items={leftItems}
          checked={leftChecked}
          onToggle={(id, item) => toggle('left', id, item.disabled)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-row md:flex-col gap-4 md:gap-8 px-3 py-3 md:py-0 items-center justify-center md:w-1/14">
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

      <div className="w-full md:w-7/15">
        <TransferListBox
          title={rightTitle}
          subtitle={rightSubtitle}
          className="h-full"
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
