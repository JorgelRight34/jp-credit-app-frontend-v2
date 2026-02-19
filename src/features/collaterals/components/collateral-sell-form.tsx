import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import { useCollateralSellForm } from '../hooks/useCollateralSellForm'
import { Collateral } from '../models/collateral'
import { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import { Transaction } from '@/features/transactions'
import { useRouter } from '@/hooks/useRouter'

interface CollateralSellFormProps extends DataModuleFormProps<
  Transaction,
  CollateralFormValues
> {
  collateral: Collateral
}

const CollateralSellForm = ({
  collateral,
  ...props
}: CollateralSellFormProps) => {
  const router = useRouter()
  const form = useCollateralSellForm({
    collateral,
    onSuccess: () =>
      router.navigate({
        to: '/collaterals/$id',
        params: { id: collateral.id.toString() },
      }),
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="value"
            label="Monto de venta"
            input={CurrencyInput}
          />
          <FormGroup name="date" label="Fecha de venta" input={DateInput} />
        </FormRow>
        <FormGroup
          name="description"
          label="Descripción"
          input={RichTextEditor}
        />
      </Form>
    </FormContainer>
  )
}

export default CollateralSellForm
