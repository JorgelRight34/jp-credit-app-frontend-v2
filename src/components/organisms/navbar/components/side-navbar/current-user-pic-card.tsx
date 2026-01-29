import clsx from 'clsx'
import { Image } from '@/components/atoms'
import { useAuth } from '@/contexts/auth-context'
import { getProfilePicWithInitials } from '@/lib/utils/auth-utils'

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
  background = 'random',
  color = '',
  showBorder = true,
}: CurrentUserPicCardProps) => {
  const { user } = useAuth()
  const src = getProfilePicWithInitials(user, background, color)

  return (
    <div
      className={clsx('relative', className, {
        'profile-pic-card-wrapper': showBorder && src,
        '!invisible': !src,
      })}
    >
      <Image
        src={src}
        className={clsx('rounded-full profile-pic-card', {
          '!hidden': !src,
        })}
        alt={src}
      />
    </div>
  )
}

export default CurrentUserPicCard
