import { useState } from 'react'
import { useProfileForm } from '../hooks/useProfileForm'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import {
  CitizenIdInput,
  CivilStatusSelect,
  DateInput,
  EmailInput,
  Form,
  FormContainer,
  FormContainerButtons,
  FormGroup,
  FormRow,
  GenderSelect,
  Input,
  PhoneInput,
  Tab,
  Tabs,
  UploadFileForm,
} from '@/components'

const ProfileForm = ({
  ...props
}: DataModuleFormProps<Profile, ProfileFormValues>) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useProfileForm({ ...props, onDirtyChange: setIsDirty })

  return (
    <Tabs defaultActiveKey="profile">
      <Tab eventKey="profile" title="Pérfil">
        <FormContainer
          footer={<FormContainerButtons isDirty={isDirty} form={form} />}
        >
          <Form form={form}>
            <FormRow>
              <FormGroup label="Nombres" name="firstName" input={Input} />
              <FormGroup label="Apellidos" name="lastName" input={Input} />
              <FormGroup
                label="Email"
                name="email"
                input={EmailInput}
                optional
              />
            </FormRow>
            <FormRow>
              <FormGroup label="Género" name="gender" input={GenderSelect} />
              <FormGroup
                label="Nacimiento"
                name="dateOfBirth"
                input={DateInput}
              />
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
                label="Dirección"
                name="address"
                input={Input}
                optional
              />
              <FormGroup
                label="Profesión"
                name="profession"
                input={Input}
                optional
              />
            </FormRow>
            <FormRow>
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
              <FormGroup
                label="Nacionalidad"
                name="nationality"
                input={Input}
                optional
              />
            </FormRow>
          </Form>
        </FormContainer>
      </Tab>
      <Tab eventKey="files" title="Archivos">
        <UploadFileForm />
      </Tab>
    </Tabs>
  )
}

export default ProfileForm
