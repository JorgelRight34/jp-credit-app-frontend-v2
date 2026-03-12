import { useState } from 'react'
import { useProfileFileAttachmentsForm } from '../hooks/useProfileFileAttachmentsForm'
import type { Profile } from '../models/profile'
import {
  FileAttachmentsForm,
  FormContainerButtons,
  FormLayout,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

interface ProfileEditFilesFormProps {
  profile: Profile
}

const ProfileEditFilesForm = ({ profile }: ProfileEditFilesFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useProfileFileAttachmentsForm({ profile })

  return (
    <FormLayout
      onSubmit={fileAttachmentsForm.handleSubmit}
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onReset={fileAttachmentsForm.handleReset}
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

export default ProfileEditFilesForm
