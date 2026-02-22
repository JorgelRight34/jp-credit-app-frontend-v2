import { PropsWithChildren } from 'react'
import { SecondaryBtn } from '../../../button'

interface PickerInputPanelProps extends PropsWithChildren {
  reset: () => void
}

const PickerInputPanel = ({ reset, children }: PickerInputPanelProps) => {
  return (
    <div className="flex flex-col">
      <section className="flex-1">{children}</section>
      <aside className="flex flex-shrink-0 items-center py-3">
        <SecondaryBtn onClick={reset}>Resetear</SecondaryBtn>
      </aside>
    </div>
  )
}

export default PickerInputPanel
