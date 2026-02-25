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
    initialValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      maritalStatus: profile.maritalStatus,
      dni: profile.dni,
      address: profile.address,
      landline: profile.landline,
      officePhone: profile.officePhone,
      phoneNumber: profile.phoneNumber,
    },
    profileId: profile.id,
    shouldEdit: true,
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
