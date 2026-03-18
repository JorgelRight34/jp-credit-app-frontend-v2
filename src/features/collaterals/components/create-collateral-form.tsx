import { useCollateralForm } from '../hooks/useCollateralForm'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import type { DataModuleFormProps } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import {
  FileAttachmentsForm,
  FileAttachmentsPanel,
  FormContainer,
  FormGroup,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import CollateralDataForm from './collateral-data-form'
import { LoanSearchInput } from '@/features/loans'
import { LoanStatusMap } from '@/features/loans/models/loanStatus'

interface CreateCollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {
  projectId?: number
}

const CreateCollateralForm = ({
  projectId,
  ...props
}: CreateCollateralFormProps) => {
  const fileAttachmentsForm = useCollateralFileAttachmentForm()
  const form = useCollateralForm({
    initialValues: {
      title: '',
      value: '',
      condition: '',
      type: '',
      location: '',
      description: null,
      expirationDate: null,
    },
    onSuccess: fileAttachmentsForm.submit,
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <TabsList>
          <Tab index={0}>Datos</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <CollateralDataForm
            loanFormGroup={
              <FormGroup
                name="loanId"
                label="Préstamo"
                config={{
                  initialQuery: { status: LoanStatusMap.active, projectId },
                }}
                input={LoanSearchInput}
              />
            }
            form={form}
          />
        </TabPanel>
        <TabPanel index={1}>
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </TabPanel>
      </Tabs>
    </FormContainer>
  )
}

export default CreateCollateralForm
