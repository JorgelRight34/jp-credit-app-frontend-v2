import type { NavbarLinkProps } from './navbar-link'
import { ArrowForwardIcon, Icon } from '@/components/atoms'

const NavbarLinkExpandTrigger = ({ option, onExpand }: NavbarLinkProps) => {
  if (!option.children || option.children.length === 0) return null

  return (
    <Icon
      wrapperClassName="flex-shrink-0 ml-2 cursor-pointer flex-shrink-0"
      icon={ArrowForwardIcon}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onExpand?.()
      }}
    />
  )
}

export default NavbarLinkExpandTrigger
