import { useCollateralForm } from '../hooks/useCollateralForm'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import type { DataModuleFormProps } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import {
  FileAttachmentsFormContainer,
  FileAttachmentsPanel,
  FormContainer,
  FormReadOnlyGroup,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import CollateralDataForm from './collateral-data-form'
import { buildLoanLabelById } from '@/features/loans'

interface EditCollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {
  collateral: Collateral
}

const EditCollateralForm = ({
  collateral,
  ...props
}: EditCollateralFormProps) => {
  const form = useCollateralForm({
    defaultValues: {
      title: collateral.title,
      description: collateral.description,
      value: collateral.value,
      condition: collateral.condition,
      type: collateral.type,
      location: collateral.location,
      expirationDate: collateral.expirationDate,
      loanId: collateral.loanId,
    },
    collateralId: collateral.id,
    shouldEdit: true,
    ...props,
  })

  return (
    <Tabs>
      <TabsList>
        <Tab index={0}>Datos</Tab>
        <Tab index={1}>Archivos</Tab>
      </TabsList>
      <TabPanel index={0}>
        <FormContainer form={form}>
          <CollateralDataForm
            loanFormGroup={
              <FormReadOnlyGroup
                name="loanId"
                label="Préstamo"
                value={buildLoanLabelById(collateral.loanId)}
                disabled
              />
            }
            form={form}
          />
        </FormContainer>
      </TabPanel>
      <TabPanel index={1}>
        <EditCollateralFileAttachmentsForm collateral={collateral} />
      </TabPanel>
    </Tabs>
  )
}

const EditCollateralFileAttachmentsForm = ({
  collateral,
}: EditCollateralFormProps) => {
  const fileAttachmentsForm = useCollateralFileAttachmentForm({ collateral })

  return (
    <FileAttachmentsFormContainer
      form={fileAttachmentsForm}
      render={FileAttachmentsPanel}
    />
  )
}

export default EditCollateralForm
