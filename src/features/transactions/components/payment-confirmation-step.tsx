import { useData } from '@/hooks/useData'
import {
  AccentPillBtn,
  ArrowBackIcon,
  ArrowForwardIcon,
  DetailRow,
  DetailRowGroup,
  Fieldset,
  FieldValues,
  FormHtmlDisplayGroup,
  FormLayout,
  FormReadOnlyGroup,
  FormRow,
  LightPillBtn,
  Paragraph,
  UseFormReturn,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import { buildLoanLabel } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { CacheKey } from '@/models'
import { PaymentResult } from '../models/paymentResult'
import { loanStatusSpanishTranslations } from '@/features/loans/lib/constants'

interface PaymentConfirmationStepProps<T extends FieldValues> {
  form: UseFormReturn<T>
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
      <div className="flex">
        <div className="flex flex-col w-7/12">
          <PaymentDetails transaction={data.transaction} />
        </div>
        <div className="flex w-5/12 px-6">
          <PaymentLoanChangesCard paymentResult={data} />
        </div>
      </div>
    </FormLayout>
  )
}

const PaymentDetails = ({
  transaction,
}: {
  transaction: PaymentResult['transaction']
}) => {
  return (
    <>
      <FormRow>
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={buildLoanLabel({ id: transaction.loanId })}
        />
        <FormReadOnlyGroup
          name="amount"
          label="Monto a pagar"
          value={toCurrency(transaction.value)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="capital"
          label="Capital"
          value={toCurrency(transaction.capitalValue)}
        />
        <FormReadOnlyGroup
          name="interest"
          label="Interés"
          value={toCurrency(transaction.interestValue)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="fee"
          label="Mora"
          value={toCurrency(transaction.penaltyFee)}
        />
        <FormReadOnlyGroup
          name="lateDays"
          label="Días de tardanza"
          value={transaction.lateDays}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="date"
          label="Fecha de pago"
          value={toFormattedDate(transaction.date)}
        />
        <FormReadOnlyGroup
          name="outstandingAmount"
          label="Balance pendiente pagado"
          value={toCurrency(transaction.outstandingAmount)}
        />
      </FormRow>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={transaction.description}
        optional
      />
    </>
  )
}

const PaymentLoanChangesCard = ({
  paymentResult: { transaction, loanBefore, loanAfter, ...paymentResult },
}: {
  paymentResult: PaymentResult
}) => {
  const loanLabel = buildLoanLabel({ id: transaction.loanId }).toUpperCase()
  return (
    <div className="flex w-full flex-col gap-6 px-3">
      <Fieldset className="p-4" legend={`${loanLabel} / DETALLES`}>
        <DetailRowGroup>
          <DetailRow
            title="Cuota"
            subtitle={toCurrency(paymentResult.loanPaymentValue)}
          />
          <DetailRow
            title="Fecha debida"
            subtitle={toFormattedDate(paymentResult.effectivePaymentDate)}
          />
        </DetailRowGroup>
      </Fieldset>
      <Fieldset className="p-4" legend={`${loanLabel} / ANTES`}>
        <DetailRowGroup>
          <DetailRow
            title="Balance capital"
            subtitle={toCurrency(loanBefore.accruedCapital)}
          />
          <DetailRow
            title="Balance interés"
            subtitle={toCurrency(loanBefore.accruedInterest)}
          />
          <DetailRow
            title="Mora pendiente"
            subtitle={toCurrency(loanBefore.totalFees)}
          />
          <DetailRow
            title="Monto atrasado"
            subtitle={toCurrency(loanBefore.outstandingAmount)}
          />
          <DetailRow
            title="Estado"
            subtitle={loanStatusSpanishTranslations[loanBefore.status]}
          />
        </DetailRowGroup>
      </Fieldset>
      <Fieldset className="p-4" legend={`${loanLabel} / DESPUES`}>
        <DetailRowGroup>
          <DetailRow
            title="Balance capital"
            subtitle={toCurrency(loanAfter.accruedCapital)}
          />
          <DetailRow
            title="Balance interés"
            subtitle={toCurrency(loanAfter.accruedInterest)}
          />
          <DetailRow
            title="Mora pendiente"
            subtitle={toCurrency(loanAfter.totalFees)}
          />
          <DetailRow
            title="Monto atrasado"
            subtitle={toCurrency(loanAfter.outstandingAmount)}
          />
          <DetailRow
            title="Estado"
            subtitle={loanStatusSpanishTranslations[loanAfter.status]}
          />
        </DetailRowGroup>
      </Fieldset>
    </div>
  )
}

const Footer = () => {
  const [_, setActive] = useFormConfirmationFlowActiveStep()

  return (
    <div className="flex border-t pt-3 justify-between">
      <span>
        <LightPillBtn icon={ArrowBackIcon} onClick={() => setActive(0)}>
          Atrás
        </LightPillBtn>
      </span>
      <span>
        <AccentPillBtn
          icon={ArrowForwardIcon}
          iconDirection="right"
          onClick={() => setActive(2)}
        >
          Continuar
        </AccentPillBtn>
      </span>
    </div>
  )
}

export default PaymentConfirmationStep
