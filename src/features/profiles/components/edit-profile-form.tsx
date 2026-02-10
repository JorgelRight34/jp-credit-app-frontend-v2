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
  Tab,
  Tabs,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

type EditProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues> & {
  profile: Profile
}

const EditProfileForm = ({ profile, ...props }: EditProfileFormProps) => {
  return (
    <Tabs defaultActiveKey="profile">
      <Tab eventKey="profile" title="Pérfil">
        <ProfileDataEditForm profile={profile} {...props} />
      </Tab>
      <Tab eventKey="files" title="Archivos">
        <ProfileEditFileAttachmentsForm profile={profile} />
      </Tab>
    </Tabs>
  )
}

const ProfileDataEditForm = ({ profile, ...props }: EditProfileFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useProfileForm({
    onDirtyChange: setIsDirty,
    profile,
    ...props,
  })

  return (
    <FormContainer
      footer={
        <FormContainerButtons isDirty={isDirty} form={form} text="Actualizar" />
      }
    >
      <ProfileDataForm form={form} />
    </FormContainer>
  )
}

const ProfileEditFileAttachmentsForm = ({ profile }: EditProfileFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useProfileFileAttachmentsForm({ profile })

  return (
    <FormContainer
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
    </FormContainer>
  )
}

export default EditProfileForm
