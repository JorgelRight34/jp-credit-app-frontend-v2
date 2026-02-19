import { useData } from '@/hooks/useData'
import {
  AccentPillBtn,
  ArrowBackIcon,
  ArrowForwardIcon,
  CancelIcon,
  FormHtmlDisplayGroup,
  FormLayout,
  FormReadOnlyGroup,
  FormRow,
  LightPillBtn,
  Paragraph,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import { getLoanLabel } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { CacheKey } from '@/models'
import { Transaction } from '../models/transaction'

interface TransactionConfirmationStepProps {
  loader: (data: any) => Promise<Transaction>
  cacheKeyBuilder: (data: any) => CacheKey
}

const TransactionConfirmationStep = ({
  loader,
  cacheKeyBuilder,
}: TransactionConfirmationStepProps) => {
  const [body] = useFormConfirmationFlowData()
  const { data, isLoading } = useData({
    loader: () => loader(body),
    key: cacheKeyBuilder(body),
    enabled: body !== null,
  })

  if (isLoading || data === undefined) return null

  return (
    <FormLayout footer={<Footer />}>
      <Paragraph>
        Verifique su pago. Para aceptar, presione <b>Continuar</b>
      </Paragraph>
      <FormRow>
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={getLoanLabel(data)}
        />
        <FormReadOnlyGroup
          name="amount"
          label="Monto a pagar"
          value={toCurrency(data.value)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="capital"
          label="Capital"
          value={toCurrency(data.capitalValue)}
        />
        <FormReadOnlyGroup
          name="interest"
          label="Interés"
          value={toCurrency(data.interestValue)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="fee"
          label="Mora"
          value={toCurrency(data.penaltyFee)}
        />
        <FormReadOnlyGroup
          name="lateDays"
          label="Días de tardanza"
          value={toCurrency(data.lateDays)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="date"
          label="Fecha de pago"
          value={toFormattedDate(data.date)}
        />
        <FormHtmlDisplayGroup
          name="description"
          label="Descripción"
          value={data.description}
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

export default TransactionConfirmationStep
