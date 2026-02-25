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
  children?: ReactNode
}

const ConfirmationModalTrigger = ({
  children,
  wrapper = 'span',
  ...props
}: ConfirmationModalTriggerProps) => {
  const confirmationModalRef = useRef<ConfirmationModalRef>(null)

  const Component = wrapper

  return (
    <>
      <Component
        className="cursor-pointer w-full"
        onClick={() => confirmationModalRef.current?.show()}
      >
        {children}
      </Component>
      <ConfirmationModal ref={confirmationModalRef} {...props} />
    </>
  )
}

export default ConfirmationModalTrigger
