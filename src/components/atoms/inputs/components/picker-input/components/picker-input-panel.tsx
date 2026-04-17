import { PropsWithChildren } from 'react'
import { SecondaryBtn } from '../../../../button'
import { Icon, RestoreIcon } from '@/components/atoms/icon'

interface PickerInputPanelProps extends PropsWithChildren {
  reset: () => void
}

const PickerInputPanel = ({ reset, children }: PickerInputPanelProps) => (
  <div className="flex h-full flex-col">
    <section className="flex-1 overflow-y-auto">{children}</section>
    <aside className="flex flex-shrink-0 items-center justify-end pt-3">
      <SecondaryBtn className="w-full !px-3 md:!w-fit" onClick={reset}>
        <Icon icon={RestoreIcon}>Resetear</Icon>
      </SecondaryBtn>
    </aside>
  </div>
)

export default PickerInputPanel
