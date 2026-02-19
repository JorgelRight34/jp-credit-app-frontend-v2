import {
  DoneAllIcon,
  Icon,
  MediumTitle,
  Paragraph,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import { useDataClient } from '@/hooks/useDataClient'
import { ReactNode, useEffect, useState } from 'react'

interface PaymentReceiptStepProps {
  successText: ReactNode
}

const PaymentReceiptStep = (props: PaymentReceiptStepProps) => {
  const [active] = useFormConfirmationFlowActiveStep()
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    if (active === 2) setHasRendered(true)
  }, [active])

  if (!hasRendered) return null

  return <PaymentReceiptStepInner {...props} />
}

const PaymentReceiptStepInner = ({ successText }: PaymentReceiptStepProps) => {
  const dataClient = useDataClient()
  const [body] = useFormConfirmationFlowData()

  return (
    <div className="flex flex-col justify-center py-3">
      <Paragraph>
        Nos place informar que la transacción fue realizada satisfactoriamente.
        A continuación los detalles de la transacción:
      </Paragraph>
      <header className="flex py-3 items-center justify-center">
        <span className="flex flex-col ">
          <Icon
            style={{ fontSize: '10rem' }}
            className="text-accent"
            icon={DoneAllIcon}
          />
          <MediumTitle>
            <b>{successText}</b>
          </MediumTitle>
        </span>
      </header>
      <aside></aside>
    </div>
  )
}

export default PaymentReceiptStep
