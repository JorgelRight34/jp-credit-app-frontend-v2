import type { NavbarLinkProps } from './navbar-link'
import { ArrowRightAltIcon, Icon } from '@/components/atoms'

const NavbarLinkExpandTrigger = ({ option, onExpand }: NavbarLinkProps) => {
  if (!option.children || option.children.length === 0) return null

  return (
    <div className="flex-shrink-0">
      <Icon
        wrapperClassName="ml-2 cursor-pointer flex-shrink-0"
        icon={ArrowRightAltIcon}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onExpand?.()
        }}
      />
    </div>
  )
}

export default NavbarLinkExpandTrigger
