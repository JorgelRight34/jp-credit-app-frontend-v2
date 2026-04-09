import { useProfileForm } from '../hooks/useProfileForm'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import ProfileDataForm from './profile-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Profile } from '../models/profile'
import type { ProfileFormValues } from '../lib/schemas/profileFormSchema'
import {
  FileAttachmentsForm,
  FormContainer,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

type CreateProfileFormProps = DataModuleFormProps<Profile, ProfileFormValues>

const CreateProfileForm = (props: CreateProfileFormProps) => {
  const fileAttachmentsForm = useProfileFileAttachmentsForm()
  const form = useProfileForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      maritalStatus: '',
      dni: '',
      address: '',
      landline: '',
      phoneNumber: '',
    },
    onSuccess: fileAttachmentsForm.submit,
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <TabsList>
          <Tab index={0}>Pérfil</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProfileDataForm form={form} />
        </TabPanel>
        <TabPanel index={1}>
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </TabPanel>
      </Tabs>
    </FormContainer>
  )
}

export default CreateProfileForm
