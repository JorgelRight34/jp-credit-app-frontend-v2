import {
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import { useCollateralLiquidateForm } from '../hooks/useCollateralLiquidateForm'
import { Collateral } from '../models/collateral'
import { toCurrency } from '@/lib/utils'

interface CollateralLiquidateFormProps {
  collateral: Collateral
}

const CollateralLiquidateForm = ({
  collateral,
  ...props
}: CollateralLiquidateFormProps) => {
  const form = useCollateralLiquidateForm({
    collateralId: collateral.id,
    ...props,
  })

  return (
    <FormContainer form={form}>
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
    </FormContainer>
  )
}

export default CollateralLiquidateForm
