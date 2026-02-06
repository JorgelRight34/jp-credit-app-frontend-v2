import { useState } from 'react'
import { useProfileForm } from '../hooks/useProfileForm'
import ProfileDataForm from './profile-data-form'
import type { Profile } from '../models/profile'
import { FormContainer, FormContainerButtons } from '@/components'

interface ProfileOverviewProps {
  profile: Profile
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useProfileForm({ profile, onDirtyChange: setIsDirty })

  return (
    <FormContainer
      footer={<FormContainerButtons form={form} isDirty={isDirty} />}
    >
      <ProfileDataForm form={form} />
    </FormContainer>
  )
}

export default ProfileOverview
