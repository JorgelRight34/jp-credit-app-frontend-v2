import { getDefaultProfilePicModel } from '../lib/constants'
import type { Profile } from '../models/profile'
import { FormReadOnlyGroup, FormRow, PhotoGallery } from '@/components'

interface ProfileOverviewProps {
  profile: Profile
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  return (
    <section>
      <div className="flex mb-6">
        <div className="flex items-center justify-center w-5/12 pr-6">
          <PhotoGallery
            className="w-full shadow-sm"
            photos={
              profile.files.length > 0
                ? profile.files.filter((c) => c.isImage)
                : [getDefaultProfilePicModel(profile)]
            }
          />
        </div>
        <aside className="w-7/12">
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

export default ProfileOverview
