import { useAuth } from '@/contexts/auth-context'
import { getNameInitials } from '@/lib/utils/auth-utils'
import { HTMLAttributes } from 'react'

const CurrentUserPicCard = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuth()

  return (
    <div className={`relative profile-pic-card-wrapper ${className}`}>
      <div className="rounded-full bg-white flex justify-center items-center profile-pic-card">
        <span className="text-sm text-accent-secondary">
          {user && getNameInitials(user)}
        </span>
      </div>
    </div>
  )
}

export default CurrentUserPicCard
