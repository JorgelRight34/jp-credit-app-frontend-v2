import {
  FormCheckboxGroup,
  FormGroup,
  FormRow,
  FormSelectGroup,
  Input,
  RichTextEditor,
} from '@/components'
import { reportKeySelectOptions } from '../lib/constants'

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
          options={reportKeySelectOptions}
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
