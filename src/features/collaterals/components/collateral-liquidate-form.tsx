import {
  Form,
  FormConfirmationFlow,
  FormConfirmationFlowContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import { useCollateralLiquidateForm } from '../hooks/useCollateralLiquidateForm'
import { PropsWithCollateral } from '../models/collateral'
import { toCurrency } from '@/lib/utils'
import { previewLiquidateCollateral } from '../services/collateralClient'
import {
  PaymentConfirmationStep,
  PaymentReceiptStep,
  usePaymentReceiptStepRef,
} from '@/features/transactions'

const CollateralLiquidateForm = ({
  collateral,
  ...props
}: PropsWithCollateral) => {
  const receiptRef = usePaymentReceiptStepRef()
  const form = useCollateralLiquidateForm({
    collateralId: collateral.id,
    onSuccess: (data) => receiptRef.current?.setPaymentResult(data),
    ...props,
  })

  return (
    <FormConfirmationFlow
      confirmation={
        <PaymentConfirmationStep
          form={form}
          previewLoader={(body) =>
            previewLiquidateCollateral(collateral.id, body)
          }
        />
      }
      overview={
        <PaymentReceiptStep
          ref={receiptRef}
          successText="El pago con garantía ha sido realizado"
        />
      }
    >
      <FormConfirmationFlowContainer form={form} initializeAsDirty>
        <Form form={form}>
          <FormRow>
            <FormReadOnlyGroup
              name="value"
              label="Monto"
              value={toCurrency(collateral.value)}
              disabled
            />
          </FormRow>
          <FormGroup
            name="description"
            label="Descripción"
            input={RichTextEditor}
            optional
          />
        </Form>
      </FormConfirmationFlowContainer>
    </FormConfirmationFlow>
  )
}

export default CollateralLiquidateForm
