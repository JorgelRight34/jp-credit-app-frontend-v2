import { toFormattedDate } from '@/lib/utils'
import { getDefaultProfilePicModel } from '../lib/constants'
import type { Profile } from '../models/profile'
import {
  FormReadOnlyGroup,
  Row,
  PhotoGallery,
  ViewMore,
  OverviewLayout,
} from '@/components'

interface ProfileOverviewProps {
  profile: Profile
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  return (
    <OverviewLayout>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-5/12">
          <ProfilePhotoGallery profile={profile} />
        </div>
        <aside className="flex w-full flex-col gap-6 md:w-7/12">
          <Row>
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
          </Row>
          <Row>
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
          </Row>
          <Row>
            <FormReadOnlyGroup label="Cédula" name="dni" value={profile.dni} />
            <FormReadOnlyGroup
              label="Email"
              name="email"
              value={profile.email}
              optional
            />
          </Row>
          <Row>
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
          </Row>
        </aside>
      </div>
      <ViewMore>
        <Row>
          <FormReadOnlyGroup
            label="Ingreso"
            name="createdAt"
            value={toFormattedDate(profile.createdAt)}
          />
          <FormReadOnlyGroup
            label="Actualizado"
            name="updatedAt"
            value={
              profile.updatedAt ? toFormattedDate(profile.updatedAt) : 'N/D'
            }
            optional
          />
        </Row>
      </ViewMore>
      <FormReadOnlyGroup label="Dirección" name="address" optional />
    </OverviewLayout>
  )
}

const ProfilePhotoGallery = ({ profile }: ProfileOverviewProps) => {
  const images = profile.files.filter((c) => c.isImage)

  return (
    <PhotoGallery
      itemBackground="black"
      className="max-h-[400px] w-full shadow-sm"
      itemHeight={350}
      photos={images.length > 0 ? images : [getDefaultProfilePicModel(profile)]}
    />
  )
}

export default ProfileOverview
