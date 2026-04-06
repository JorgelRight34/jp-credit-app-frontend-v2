import { useRef } from 'react'
import ConfirmationModal, {
  ConfirmationModalProps,
  ConfirmationModalRef,
} from './confirmation-modal'
import type { ElementType, ReactNode } from 'react'

interface ConfirmationModalTriggerProps extends Omit<
  ConfirmationModalProps,
  'ref'
> {
  wrapper?: ElementType
  disabled?: boolean
  children?: ReactNode
}

const ConfirmationModalTrigger = ({
  children,
  wrapper: Component = 'span',
  disabled,
  ...props
}: ConfirmationModalTriggerProps) => {
  const confirmationModalRef = useRef<ConfirmationModalRef>(null)

  return (
    <>
      <Component
        className="w-full cursor-pointer"
        onClick={() => confirmationModalRef.current?.show()}
        disabled={disabled}
      >
        {children}
      </Component>
      <ConfirmationModal ref={confirmationModalRef} {...props} />
    </>
  )
}

export default ConfirmationModalTrigger
