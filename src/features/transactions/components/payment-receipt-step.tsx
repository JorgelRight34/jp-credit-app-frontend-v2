import {
  Container,
  DoneAllIcon,
  Icon,
  Link,
  MediumTitle,
  Paragraph,
  SecondaryPillBtn,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  startTransition,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { PaymentResult, PropsWithPaymentResult } from '../models/paymentResult'
import { toCurrency } from '@/lib/utils'
import { buildTransactionLabel } from '../lib/utils'

interface PaymentReceiptStepProps {
  successText: ReactNode
}

interface PayemntReceiptStepHandle {
  setPaymentResult: (result: PaymentResult) => void
}

const PaymentReceiptStep = forwardRef<
  PayemntReceiptStepHandle,
  PaymentReceiptStepProps
>(({ successText }, ref) => {
  const [result, setPaymentResult] = useState<PaymentResult | null>(null)

  useImperativeHandle(ref, () => ({ setPaymentResult }), [])

  if (!result) return null

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center">
        <PaymentReceiptStepInner
          paymentResult={result}
          successText={successText}
        />
      </div>
      <div className="flex shrink-0">
        <ResetBtn
          onReset={() => {
            setPaymentResult(null)
          }}
        />
      </div>
    </div>
  )
})

const PaymentReceiptStepInner = ({
  paymentResult,
  successText,
}: PropsWithPaymentResult<PaymentReceiptStepProps>) => (
  <>
    <Paragraph>
      Nos place informar que la transacción fue realizada satisfactoriamente. A
      continuación los detalles de la transacción:
    </Paragraph>
    <header className="flex items-center justify-center py-3">
      <span className="flex flex-col">
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
    <aside className="flex w-full items-center justify-center gap-3 px-6 py-6">
      <DetailContainer>
        <Paragraph>Pago:</Paragraph>
        <MediumTitle>
          <Link
            to="/transactions/$id"
            params={{ id: paymentResult.transaction.id.toString() }}
          >
            {buildTransactionLabel(paymentResult.transaction)}
          </Link>
        </MediumTitle>
      </DetailContainer>

      <DetailContainer>
        <Paragraph>Monto:</Paragraph>
        <MediumTitle>{toCurrency(paymentResult.transaction.value)}</MediumTitle>
      </DetailContainer>

      <DetailContainer>
        <Paragraph>Beneficiario:</Paragraph>
        <MediumTitle>
          Préstamo No. {paymentResult.transaction.loanId}
        </MediumTitle>
      </DetailContainer>
    </aside>
  </>
)

const DetailContainer = ({ children }: PropsWithChildren) => (
  <Container className="flex max-w-xs flex-1 flex-col space-y-3 !p-6 shadow-sm">
    {children}
  </Container>
)

const ResetBtn = ({ onReset }: { onReset: () => void }) => {
  const [__, setActiveStep] = useFormConfirmationFlowActiveStep()
  const [_, setBody] = useFormConfirmationFlowData()

  return (
    <div className="flex w-full justify-end">
      <SecondaryPillBtn
        className="w-full md:!w-fit"
        onClick={() => {
          setActiveStep(0)
          startTransition(() => {
            onReset()
            setBody(null)
          })
        }}
      >
        Hacer otro pago
      </SecondaryPillBtn>
    </div>
  )
}

export const usePaymentReceiptStepRef = () =>
  useRef<PayemntReceiptStepHandle | null>(null)

export default PaymentReceiptStep
