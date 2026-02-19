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
import {
  liquidateCollateral,
  previewLiquidateCollateral,
} from '../services/collateralClient'
import { loansQueryKey } from '@/features/loans/lib/constants'
import {
  TransactionConfirmationStep,
  TransactionReceiptStep,
} from '@/features/transactions'
import { useRouter } from '@/hooks/useRouter'

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
        <TransactionConfirmationStep
          loader={(body) => previewLiquidateCollateral(collateral.id, body)}
          cacheKeyBuilder={() => [
            collateralsQueryKey,
            'liquidate-form',
            collateral.id,
          ]}
        />
      }
      receipt={
        <TransactionReceiptStep
          successText="El pago con garantía ha sido realizado"
          loader={(body) => liquidateCollateral(collateral.id, body)}
          keysToInvalidate={[[collateralsQueryKey], [loansQueryKey]]}
        />
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
