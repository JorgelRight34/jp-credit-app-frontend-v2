import { useAuth } from '@/contexts/auth-context'
import ProfilePicCard from './ProfilePicCard'
import { getProfilePicWithInitials } from '../lib/utils'

interface CurrentUserPicCardProps {
  className?: string
  showBorder?: boolean
  height?: string
  color?: string
  width?: string
  background?: string
}

const CurrentUserPicCard = ({
  className,
  height = '',
  width = '',
  background = 'random',
  color = '',
  showBorder = true,
}: CurrentUserPicCardProps) => {
  const { user } = useAuth()

  return (
    <ProfilePicCard
      className={className}
      style={{ height, width }}
      showBorder={showBorder}
      src={getProfilePicWithInitials(user, background, color)}
    />
  )
}

export default CurrentUserPicCard
