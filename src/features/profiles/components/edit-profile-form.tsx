import { useState } from 'react'
import { useProfileForm } from '../hooks/useProfileForm'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import ProfileDataForm from './profile-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import {
  FileAttachmentsForm,
  FormContainer,
  FormContainerButtons,
  FormLayout,
  Tab,
  Tabs,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

type EditProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues> & {
  profile: Profile
}

const EditProfileForm = ({ profile, ...props }: EditProfileFormProps) => {
  const form = useProfileForm({
    profile,
    ...props,
  })

  return (
    <Tabs defaultActiveKey="profile">
      <Tab eventKey="profile" title="Pérfil">
        <FormContainer form={form}>
          <ProfileDataForm form={form} />
        </FormContainer>
      </Tab>
      <Tab eventKey="files" title="Archivos">
        <ProfileEditFileAttachmentsForm profile={profile} />
      </Tab>
    </Tabs>
  )
}

const ProfileEditFileAttachmentsForm = ({ profile }: EditProfileFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useProfileFileAttachmentsForm({ profile })

  return (
    <FormLayout
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onSubmit={fileAttachmentsForm.handleSubmit}
          text="Actualizar adjuntos"
        />
      }
    >
      <FileAttachmentsForm
        ref={fileAttachmentsForm.formRef}
        form={fileAttachmentsForm.form}
        onDirtyChange={setIsDirty}
        render={FileAttachmentsPanel}
      />
    </FormLayout>
  )
}

export default EditProfileForm
