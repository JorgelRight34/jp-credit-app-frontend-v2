import { getNameInitials } from '@/lib/utils/auth-utils'
import { PropsWithUser } from '@/models/user'
import { HTMLAttributes } from 'react'

type CurrentUserPicCardProps = HTMLAttributes<HTMLDivElement> & PropsWithUser

const CurrentUserPicCard = ({
  user,
  className = '',
  ...props
}: CurrentUserPicCardProps) => {
  return (
    <div
      className={`relative profile-pic-card-wrapper ${className}`}
      {...props}
    >
      <div className="rounded-full bg-white flex justify-center items-center profile-pic-card">
        <span className="text-sm text-accent-secondary">
          {getNameInitials(user)}
        </span>
      </div>
    </div>
  )
}

export default CurrentUserPicCard
