import {
  getFirstAndLastName,
  getFullName,
  toAllTitleCase,
} from '@/lib/utils/utils'
import { profilesPath } from '../lib/constants'
import { Profile } from '../models/profile'
import { AppLink } from '@/components'

interface LinkToProfileProps {
  profile?: Profile | string
  id?: number
  fullName?: boolean
  onClick?: (event: React.MouseEvent) => void
}

const LinkToProfile = ({
  profile,
  fullName = false,
  id,
  onClick,
}: LinkToProfileProps) => {
  const isProfileString = typeof profile === 'string'
  const name = isProfileString
    ? profile
    : fullName
      ? getFullName(profile)
      : getFirstAndLastName(profile)

  return (
    <AppLink
      className="text-accent underline"
      to={`/${profilesPath}/${isProfileString ? id : profile?.id} `}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
    >
      {toAllTitleCase(name)}
    </AppLink>
  )
}

export default LinkToProfile
