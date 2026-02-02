import clsx from 'clsx'
import { LightBtn } from '../../button'
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
  leftTitle = 'Available',
  rightTitle = 'Selected',
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
    <div className={clsx('flex', className)}>
      <div className="w-7/15">
        <TransferListBox
          title={leftTitle}
          subtitle={leftSubtitle}
          className="h-full"
          headerClassName="bg-stone-50"
          items={leftItems}
          checked={leftChecked}
          onToggle={(id, item) => toggle('left', id, item.disabled)}
          disabled={disabled}
        />
      </div>
      <div className="w-1/14 flex flex-col gap-8 px-3 items-center justify-center">
        <LightBtn
          onClick={moveRight}
          disabled={disabled || leftChecked.size === 0}
        >
          &gt;
        </LightBtn>
        <LightBtn
          onClick={moveLeft}
          disabled={disabled || rightChecked.size === 0}
        >
          &lt;
        </LightBtn>
        <LightBtn
          onClick={moveAllRight}
          disabled={disabled || leftItems.every((i) => i.disabled)}
        >
          &gt;&gt;
        </LightBtn>
        <LightBtn
          type="button"
          onClick={moveAllLeft}
          disabled={disabled || rightItems.every((i) => i.disabled)}
        >
          &lt;&lt;
        </LightBtn>
      </div>
      <div className="w-7/15">
        <TransferListBox
          title={rightTitle}
          subtitle={rightSubtitle}
          className="h-full"
          headerClassName="bg-accent"
          subtitleClassName="text-white"
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
