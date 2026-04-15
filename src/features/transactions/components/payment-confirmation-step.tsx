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
  Icon,
  LightPillBtn,
  OverviewLayout,
  Paragraph,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
  UseFormReturn,
} from '@/components'
import { buildLoanLabel } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { PaymentResult, PropsWithPaymentResult } from '../models/paymentResult'
import { loanStatusSpanishTranslations } from '@/features/loans/lib/constants'
import { PropsWithTransaction } from '../models/transaction'
import { startTransition } from 'react'

interface PaymentConfirmationStepProps<T extends FieldValues> {
  form: UseFormReturn<T>
  previewLoader: (data: T) => Promise<PaymentResult>
}

const PaymentConfirmationStep = <T extends FieldValues>({
  form,
  previewLoader,
}: PaymentConfirmationStepProps<T>) => {
  const [body] = useFormConfirmationFlowData()
  const { data, isLoading } = useData({
    loader: () => previewLoader(body as T),
    key: [],
    refetchOnWindowFocus: false,
    enabled: body !== null,
    gcTime: 0,
    staleTime: 0,
  })

  if (isLoading || !data) return null

  return (
    <FormLayout footer={<Footer form={form} />}>
      <Paragraph>
        Verifique su pago. Para aceptar, presione <b>Continuar</b>
      </Paragraph>
      <div className="flex flex-col gap-6 md:flex-row md:gap-0">
        <div className="flex flex-col md:w-7/12">
          <PaymentDetails transaction={data.transaction} />
        </div>
        <div className="flex md:w-5/12 md:pl-6">
          <PaymentLoanChangesCard paymentResult={data} />
        </div>
      </div>
    </FormLayout>
  )
}

const PaymentDetails = ({ transaction }: PropsWithTransaction) => (
  <OverviewLayout>
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
        name="arrearBalance"
        label="Balance pendiente pagado"
        value={toCurrency(transaction.paidArrears)}
      />
    </FormRow>
    <FormHtmlDisplayGroup
      name="description"
      label="Descripción"
      value={transaction.description}
      optional
    />
  </OverviewLayout>
)

const PaymentLoanChangesCard = ({
  paymentResult: { transaction, loanBefore, loanAfter, ...paymentResult },
}: PropsWithPaymentResult) => {
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
            subtitle={toCurrency(loanBefore.penaltyBalance)}
          />
          <DetailRow
            title="Monto atrasado"
            subtitle={toCurrency(loanBefore.arrearBalance)}
          />
          <DetailRow
            title="Estado"
            subtitle={loanStatusSpanishTranslations[loanBefore.status]}
          />
        </DetailRowGroup>
      </Fieldset>
      <Fieldset className="p-4" legend={`${loanLabel} / DESPUÉS`}>
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
            subtitle={toCurrency(loanAfter.penaltyBalance)}
          />
          <DetailRow
            title="Monto atrasado"
            subtitle={toCurrency(loanAfter.arrearBalance)}
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

const Footer = <T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const [_, setActive] = useFormConfirmationFlowActiveStep()

  return (
    <div className="flex justify-between gap-3 border-t pt-3">
      <LightPillBtn className="w-full md:!w-fit" onClick={() => setActive(0)}>
        <Icon icon={ArrowBackIcon}>Atrás</Icon>
      </LightPillBtn>

      <AccentPillBtn
        className="w-full md:!w-fit"
        onClick={() => {
          setActive(2)
          startTransition(() => form.submit())
        }}
      >
        <Icon icon={ArrowForwardIcon} className="!flex-row-reverse">
          Continuar
        </Icon>
      </AccentPillBtn>
    </div>
  )
}

export default PaymentConfirmationStep
