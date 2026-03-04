import {
  FormCheckboxGroup,
  FormGroup,
  FormRow,
  FormSelectGroup,
  Input,
  RichTextEditor,
  SelectOptions,
} from '@/components'
import { Report } from '../models/report'

const ReportFormPanel = () => {
  return (
    <>
      <FormRow>
        <FormGroup name="title" label="Título" input={Input} />
      </FormRow>
      <FormRow>
        <FormSelectGroup
          name="key"
          label="Categoría"
          options={[['loan', 'Préstamos']] as SelectOptions<Report['key']>}
        />
        <FormCheckboxGroup name="bookmark" label="Marcar" />
      </FormRow>
      <FormGroup
        name="description"
        label="Descripción"
        input={RichTextEditor}
        optional
      />
    </>
  )
}

export default ReportFormPanel
