import { useProfileForm } from '../hooks/useProfileForm'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import ProfileDataForm from './profile-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import {
  FileAttachmentsFormContainer,
  FormContainer,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

type EditProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues> & {
  profile: Profile
}

const EditProfileForm = ({ profile, ...props }: EditProfileFormProps) => {
  const form = useProfileForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      maritalStatus: profile.maritalStatus,
      dni: profile.dni,
      address: profile.address,
      landline: profile.landline,
      phoneNumber: profile.phoneNumber,
    },
    profileId: profile.id,
    shouldEdit: true,
    ...props,
  })

  return (
    <Tabs>
      <TabsList>
        <Tab index={0}>Pérfil</Tab>
        <Tab index={1}>Archivos</Tab>
      </TabsList>
      <TabPanel index={0}>
        <FormContainer form={form}>
          <ProfileDataForm form={form} />
        </FormContainer>
      </TabPanel>
      <TabPanel index={1}>
        <ProfileEditFileAttachmentsForm profile={profile} />
      </TabPanel>
    </Tabs>
  )
}

const ProfileEditFileAttachmentsForm = ({ profile }: EditProfileFormProps) => {
  const fileAttachmentsForm = useProfileFileAttachmentsForm({ profile })

  return (
    <FileAttachmentsFormContainer
      form={fileAttachmentsForm}
      render={FileAttachmentsPanel}
    />
  )
}

export default EditProfileForm
