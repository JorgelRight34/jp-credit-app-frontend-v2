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
  Tabs,
} from '@/components'
import CollateralDataForm from './collateral-data-form'
import { LoanSearchInput } from '@/features/loans'
import { LoanStatusMap } from '@/features/loans/models/loanStatus'

interface CreateCollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {}

const CreateCollateralForm = (props: CreateCollateralFormProps) => {
  const fileAttachmentsForm = useCollateralFileAttachmentForm()
  const form = useCollateralForm({
    onSuccess: fileAttachmentsForm.submit,
    initialValues: {
      title: '',
      value: '',
      condition: '',
      type: '',
      location: '',
      description: null,
      expirationDate: null,
    },
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs defaultActiveKey="data">
        <Tab eventKey="data" title="Datos">
          <CollateralDataForm
            loanFormGroup={
              <FormGroup
                name="loanId"
                label="Préstamo"
                input={(p) =>
                  LoanSearchInput({
                    ...p,
                    datatable: {
                      initialQuery: { status: LoanStatusMap.active },
                    },
                  })
                }
              />
            }
            form={form}
          />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CreateCollateralForm
