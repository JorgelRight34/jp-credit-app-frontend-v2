import clsx from 'clsx'
import type { NavbarLinkProps } from './navbar-link'
import { useRouter } from '@/hooks/useRouter'

const NavbarLinkContainer = ({
  option,
  children,
  isActive,
  className,
  onClick,
}: NavbarLinkProps & { isActive: boolean }) => {
  const router = useRouter()

  return (
    <div
      className="nav-link-container position-relative"
      onClick={(e) => {
        if (e.defaultPrevented) return
        onClick?.()
        router.navigate({ to: option.route })
      }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
          router.navigate({ to: option.route })
        }
      }}
    >
      <div
        className={clsx(
          'rounded-end-3 nav-link-option nav-link-parent rounded-right p-0',
          className,
          {
            'nav-link-active bg-active-transparent text-white shadow-sm':
              isActive,
            'text-gray-500': !isActive,
          },
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default NavbarLinkContainer
