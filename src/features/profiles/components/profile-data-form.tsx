import type { useProfileForm } from '../hooks/useProfileForm'
import {
  CitizenIdInput,
  CivilStatusSelect,
  DateInput,
  EmailInput,
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
    <Form form={form}>
      <FormRow>
        <FormGroup label="Nombres" name="firstName" input={Input} />
        <FormGroup label="Apellidos" name="lastName" input={Input} />
        <FormGroup label="Email" name="email" input={EmailInput} optional />
      </FormRow>
      <FormRow>
        <FormGroup label="Género" name="gender" input={GenderSelect} />
        <FormGroup label="Nacimiento" name="dateOfBirth" input={DateInput} />
        <FormGroup
          name="maritalStatus"
          label="Estado civil"
          input={CivilStatusSelect}
          optional
        />
      </FormRow>
      <FormRow>
        <FormGroup label="Cédula" name="dni" input={CitizenIdInput} />
        <FormGroup
          label="Teléfono casa"
          name="landline"
          input={PhoneInput}
          optional
        />
        <FormGroup
          label="Célular"
          name="phoneNumber"
          input={PhoneInput}
          optional
        />
      </FormRow>
      <FormGroup label="Dirección" name="address" input={Input} optional />
    </Form>
  )
}

export default ProfileDataForm
