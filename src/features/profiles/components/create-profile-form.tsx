import { useProfileForm } from '../hooks/useProfileForm'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import ProfileDataForm from './profile-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import { FileAttachmentsForm, FormContainer, Tab, Tabs } from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

type CreateProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues>

const CreateProfileForm = (props: CreateProfileFormProps) => {
  const fileAttachmentsForm = useProfileFileAttachmentsForm({})
  const form = useProfileForm({
    onSuccess: fileAttachmentsForm.submit,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      maritalStatus: '',
      dni: '',
      address: '',
      landline: '',
      officePhone: '',
      phoneNumber: '',
    },
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs defaultActiveKey="profile">
        <Tab eventKey="profile" title="Pérfil">
          <ProfileDataForm form={form} />
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

export default CreateProfileForm
