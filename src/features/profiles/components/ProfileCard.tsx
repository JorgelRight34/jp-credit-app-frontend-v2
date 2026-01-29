import { User } from '@/features/auth'
import { getProfilePicWithInitials, isProfile } from '../lib/utils'
import { Profile } from '../models/profile'
import { getFirstAndLastName } from '@/lib/utils/utils'
import { Icon, ImageWithLightBox } from '@/components'
import clsx from 'clsx'

interface ProfileCardProps {
  profile: Profile | User
  className?: string
}

const ProfileCard = ({ profile, className }: ProfileCardProps) => {
  return (
    <div
      className={clsx(
        'border-accent-secondary rounded p-3 shadow-sm md:max-w-xs',
        className,
      )}
    >
      {/* Heading */}
      <h3 className="mb-3 truncate text-center">
        {getFirstAndLastName(profile)}
      </h3>
      {/* Image */}
      <ImageWithLightBox
        className="mb-3 h-[300px] w-full rounded-lg object-cover shadow-sm"
        src={profile.photo?.url || getProfilePicWithInitials(profile)}
        alt={`Foto de ${profile.firstName}`}
        image={profile.photo}
      />
      {/* Contact */}
      <aside className="flex flex-col">
        {/* Email */}
        {profile.email && (
          <Icon
            icon="mail"
            label={profile.email}
            className="mr-2"
            title={profile.email}
            data-title={profile.email}
            wrapperClassName="mx-auto mb-2 flex w-full cursor-pointer items-center justify-center truncate"
          />
        )}
        {/* Address */}
        {isProfile(profile) && (
          <Icon
            icon="pin_drop"
            wrapperClassName="truncate mx-auto flex w-full cursor-pointer items-center justify-center"
            label={profile.address}
            title={profile.address}
            data-title={profile.address}
          />
        )}
      </aside>
    </div>
  )
}

export default ProfileCard
