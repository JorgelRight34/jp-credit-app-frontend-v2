import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  Input,
  NumericInput,
  PercentageInput,
} from '@/components'
import { Project } from '../models/project'
import { ProjectFormValues } from '../lib/schemas/projectFormSchema'
import { useProjectForm } from '../hooks/useProjectForm'

interface ProjectFormProps extends DataModuleFormProps<
  Project,
  ProjectFormValues
> {
  project?: Project
}

const ProjectForm = (props: ProjectFormProps) => {
  const form = useProjectForm(props)

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup label="Nombre" name="name" input={Input} />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Días de gracia"
            name="graceDays"
            input={NumericInput}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Tasa de penalidad (por defecto)"
            name="defaultPenaltyRate"
            input={PercentageInput}
          />
        </FormRow>
      </Form>
    </FormContainer>
  )
}

export default ProjectForm
