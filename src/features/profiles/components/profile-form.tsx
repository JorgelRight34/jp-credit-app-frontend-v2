import { useState } from 'react'
import { useProfileForm } from '../hooks/useProfileForm'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import ProfileDataForm from './profile-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import {
  FileAttachmentsForm,
  FileFormExplorer,
  FormContainer,
  FormContainerButtons,
  Tab,
  Tabs,
} from '@/components'

type ProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues> & {
  profile?: Profile
}

const ProfileForm = ({ profile, ...props }: ProfileFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useProfileFileAttachmentsForm({ profile })
  const form = useProfileForm({
    onDirtyChange: setIsDirty,
    onSuccess: fileAttachmentsForm.submit,
    ...props,
  })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
      <Tabs defaultActiveKey="profile">
        <Tab eventKey="profile" title="Pérfil">
          <ProfileDataForm form={form} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileFormExplorer}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default ProfileForm

/* <button
            type="button"
            className="hidden border w-[20px] p-3"
            onClick={() => {
              form.form.setValue('firstName', 'Jorge  ')
              form.form.setValue('lastName', 'Perez')
              form.form.setValue(
                'dni',
                `12345676${Math.floor(200 + Math.random() * 900)}`,
              )
              form.form.setValue('gender', 'M')
              form.form.setValue('dateOfBirth', '1990-01-01')
              form.form.setValue('email', 'jorge.perez@example.com')
              form.form.setValue('landline', '021234567')
              form.form.setValue('phoneNumber', '099876543')
              form.form.setValue('address', 'Calle Falsa 123')
              form.form.setValue('maritalStatus', 'single')
            }}
          >
            Generar valores
          </button> */
