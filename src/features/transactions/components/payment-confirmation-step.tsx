import { useData } from '@/hooks/useData'
import {
  AccentPillBtn,
  ArrowBackIcon,
  ArrowForwardIcon,
  CancelIcon,
  FieldValues,
  FormHtmlDisplayGroup,
  FormLayout,
  FormReadOnlyGroup,
  FormRow,
  LightPillBtn,
  Paragraph,
  UseFormBuilderReturn,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import { getLoanLabel } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { CacheKey } from '@/models'
import { PaymentResult } from '../models/paymentResult'

interface PaymentConfirmationStepProps<T extends FieldValues> {
  form: UseFormBuilderReturn<T>
  previewLoader: (data: T) => Promise<PaymentResult>
  cacheKeyBuilder: (data: T) => CacheKey
}

const PaymentConfirmationStep = <T extends FieldValues>({
  previewLoader,
  cacheKeyBuilder,
}: PaymentConfirmationStepProps<T>) => {
  const [body] = useFormConfirmationFlowData()
  const { data, isLoading } = useData({
    loader: () => previewLoader(body as T),
    key: cacheKeyBuilder(body as T),
    enabled: body !== null,
  })

  if (isLoading || !data) return null

  return (
    <FormLayout footer={<Footer />}>
      <Paragraph>
        Verifique su pago. Para aceptar, presione <b>Continuar</b>
      </Paragraph>
      <FormRow>
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={getLoanLabel(data.transaction)}
        />
        <FormReadOnlyGroup
          name="amount"
          label="Monto a pagar"
          value={toCurrency(data.transaction.value)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="capital"
          label="Capital"
          value={toCurrency(data.transaction.capitalValue)}
        />
        <FormReadOnlyGroup
          name="interest"
          label="Interés"
          value={toCurrency(data.transaction.interestValue)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="fee"
          label="Mora"
          value={toCurrency(data.transaction.penaltyFee)}
        />
        <FormReadOnlyGroup
          name="lateDays"
          label="Días de tardanza"
          value={toCurrency(data.transaction.lateDays)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="date"
          label="Fecha de pago"
          value={toFormattedDate(data.transaction.date)}
        />
        <FormHtmlDisplayGroup
          name="description"
          label="Descripción"
          value={data.transaction.description}
          optional
        />
      </FormRow>
    </FormLayout>
  )
}

const Footer = () => {
  const [_, setActive] = useFormConfirmationFlowActiveStep()

  return (
    <div className="flex justify-between">
      <div className="flex items-center w-4/12 gap-3">
        <LightPillBtn icon={ArrowBackIcon} onClick={() => setActive(0)}>
          Atrás
        </LightPillBtn>
        <LightPillBtn icon={CancelIcon}>Cancelar</LightPillBtn>
        <AccentPillBtn icon={ArrowForwardIcon} onClick={() => setActive(2)}>
          Continuar
        </AccentPillBtn>
      </div>
    </div>
  )
}

export default PaymentConfirmationStep
