import { useState } from 'react'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import type { Profile } from '../models/profile'
import {
  FileAttachmentsForm,
  FormContainer,
  FormContainerButtons,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

interface ProfileEditFilesFormProps {
  profile: Profile
}

const ProfileEditFilesForm = ({ profile }: ProfileEditFilesFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useProfileFileAttachmentsForm({ profile })

  return (
    <FormContainer
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onReset={() => form.formRef.current?.reset()}
          onSubmit={() => form.formRef.current?.submit()}
        />
      }
    >
      <FileAttachmentsForm
        ref={form.formRef}
        form={form.form}
        onDirtyChange={setIsDirty}
        render={FileAttachmentsPanel}
      />
    </FormContainer>
  )
}

export default ProfileEditFilesForm
