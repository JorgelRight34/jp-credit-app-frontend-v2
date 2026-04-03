import { getNameInitials } from '@/lib/utils/auth-utils'
import { PropsWithUser } from '@/models/user'
import { HTMLAttributes } from 'react'
import '../_navbar.css'

type CurrentUserPicCardProps = HTMLAttributes<HTMLDivElement> & PropsWithUser

const CurrentUserPicCard = ({
  user,
  className = '',
  ...props
}: CurrentUserPicCardProps) => {
  return (
    <div
      className={`profile-pic-card-wrapper flex h-full w-full items-center justify-center rounded-full !p-0 ${className}`}
      {...props}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-white">
        <span className="text-accent-secondary !text-xs md:text-sm">
          {getNameInitials(user)}
        </span>
      </div>
    </div>
  )
}

export default CurrentUserPicCard
