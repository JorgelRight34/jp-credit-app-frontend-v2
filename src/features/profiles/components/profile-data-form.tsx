import type { useProfileForm } from '../hooks/useProfileForm'
import {
  CitizenIdInput,
  MaritalStatusSelect,
  DateInput,
  EmailInput,
  Fieldset,
  Form,
  FormGroup,
  FormRow,
  GenderSelect,
  Input,
  PhoneInput,
} from '@/components'

interface ProfileDataFormProps {
  form: ReturnType<typeof useProfileForm>
}

const ProfileDataForm = ({ form }: ProfileDataFormProps) => {
  return (
    <Form form={form} className="flex flex-col gap-3">
      <Fieldset legend="Datos Personales">
        <FormRow>
          <FormGroup label="Nombres" name="firstName" input={Input} />
          <FormGroup label="Apellidos" name="lastName" input={Input} />
        </FormRow>
        <FormRow>
          <FormGroup label="Género" name="gender" input={GenderSelect} />
          <FormGroup label="Nacimiento" name="dateOfBirth" input={DateInput} />
        </FormRow>
        <FormRow>
          <FormGroup label="Cédula" name="dni" input={CitizenIdInput} />
          <FormGroup
            label="Estado civil"
            name="maritalStatus"
            input={MaritalStatusSelect}
          />
        </FormRow>
      </Fieldset>
      <Fieldset legend="Contacto">
        <FormRow>
          <FormGroup
            label="Teléfono casa"
            name="landline"
            input={PhoneInput}
            optional
          />
          <FormGroup
            label="Teléfono célular"
            name="phoneNumber"
            input={PhoneInput}
            optional
          />
        </FormRow>
        <FormRow>
          <FormGroup label="Dirección" name="address" input={Input} optional />
          <FormGroup label="Email" name="email" input={EmailInput} optional />
        </FormRow>
      </Fieldset>
    </Form>
  )
}

export default ProfileDataForm
