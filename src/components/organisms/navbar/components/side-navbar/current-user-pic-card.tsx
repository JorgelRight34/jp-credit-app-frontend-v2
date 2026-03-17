import { getNameInitials } from '@/lib/utils/auth-utils'
import { PropsWithUser } from '@/models/user'
import { HTMLAttributes } from 'react'

type CurrentUserPicCardProps = HTMLAttributes<HTMLDivElement> & PropsWithUser

const CurrentUserPicCard = ({
  user,
  className = '',
  style,
  ...props
}: CurrentUserPicCardProps) => {
  return (
    <div
      className={`profile-pic-card-wrapper relative !p-0 md:p-1 ${className}`}
      style={{ height: style?.height, width: style?.height }}
      {...props}
    >
      <div className="profile-pic-card flex items-center justify-center rounded-full bg-white">
        <span className="text-accent-secondary !text-xs md:text-sm">
          {getNameInitials(user)}
        </span>
      </div>
    </div>
  )
}

export default CurrentUserPicCard
