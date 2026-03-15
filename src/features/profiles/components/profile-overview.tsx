import { getDefaultProfilePicModel } from '../lib/constants'
import type { Profile } from '../models/profile'
import { FormReadOnlyGroup, FormRow, PhotoGallery } from '@/components'

interface ProfileOverviewProps {
  profile: Profile
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-6 mb-0 md:mb-6">
        <div className="flex items-center justify-center w-full md:w-5/12">
          <ProfilePhotoGallery profile={profile} />
        </div>
        <aside className="w-full md:w-7/12">
          <FormRow>
            <FormReadOnlyGroup
              label="Nombres"
              name="firstName"
              value={profile.firstName}
            />
            <FormReadOnlyGroup
              label="Apellidos"
              name="lastName"
              value={profile.lastName}
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              label="Género"
              name="gender"
              value={profile.gender}
            />
            <FormReadOnlyGroup
              label="Nacimiento"
              name="dateOfBirth"
              value={profile.dateOfBirth}
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup label="Cédula" name="dni" value={profile.dni} />
            <FormReadOnlyGroup
              label="Email"
              name="email"
              value={profile.email}
              optional
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              label="Teléfono casa"
              name="landline"
              value={profile.landline}
              optional
            />
            <FormReadOnlyGroup
              label="Teléfono célular"
              name="phoneNumber"
              value={profile.phoneNumber}
              optional
            />
          </FormRow>
        </aside>
      </div>
      <FormReadOnlyGroup label="Dirección" name="address" optional />
    </section>
  )
}

const ProfilePhotoGallery = ({ profile }: ProfileOverviewProps) => {
  const images = profile.files.filter((c) => c.isImage)

  return (
    <PhotoGallery
      itemBackground="black"
      className="w-full shadow-sm max-h-[400px]"
      itemHeight={350}
      photos={images.length > 0 ? images : [getDefaultProfilePicModel(profile)]}
    />
  )
}

export default ProfileOverview
