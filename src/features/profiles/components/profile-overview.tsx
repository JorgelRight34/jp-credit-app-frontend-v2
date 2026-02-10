import type { Profile } from '../models/profile'
import { FormReadOnlyGroup, FormRow } from '@/components'

interface ProfileOverviewProps {
  profile: Profile
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  return (
    <section>
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
      <FormReadOnlyGroup label="Dirección" name="address" optional />
    </section>
  )
}

export default ProfileOverview
