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
import { Collateral } from '../models/collateral'
import { toCurrency } from '@/lib/utils'
import { collateralsQueryKey } from '../lib/constants'
import { previewLiquidateCollateral } from '../services/collateralClient'
import { useRouter } from '@/hooks/useRouter'
import {
  PaymentConfirmationStep,
  PaymentReceiptStep,
} from '@/features/transactions'

interface CollateralLiquidateFormProps {
  collateral: Collateral
}

const CollateralLiquidateForm = ({
  collateral,
  ...props
}: CollateralLiquidateFormProps) => {
  const router = useRouter()
  const form = useCollateralLiquidateForm({
    collateralId: collateral.id,
    onSuccess: () =>
      router.navigate({
        to: '/collaterals/$id',
        params: { id: collateral.id.toString() },
      }),
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
          cacheKeyBuilder={() => [
            collateralsQueryKey,
            'liquidate-form',
            collateral.id,
          ]}
        />
      }
      receipt={
        <PaymentReceiptStep successText="El pago con garantía ha sido realizado" />
      }
    >
      <FormConfirmationFlowContainer form={form}>
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
            className="flex-1"
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
