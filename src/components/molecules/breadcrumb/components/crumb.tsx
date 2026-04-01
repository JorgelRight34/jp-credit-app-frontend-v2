import clsx from 'clsx'
import type { BreadcrumbSpec } from '../models/breadcrumb'
import type { LinkProps } from '@mui/material'
import { Icon, Link } from '@/components/atoms'

interface CrumbProps extends LinkProps {
  isLast: boolean
  breadcrumb: BreadcrumbSpec
}

const Crumb = ({ isLast, breadcrumb, ...props }: CrumbProps) => {
  return (
    <Link
      className={clsx('text-muted hover-accent flex items-center text-sm', {
        '!cursor-pointer': !isLast,
        'opacity-50': isLast,
      })}
      underline="none"
      color={isLast ? '' : 'inherit'}
      aria-current={isLast ? 'page' : undefined}
      to={breadcrumb.disabled ? '.' : breadcrumb.pathname}
      search={breadcrumb.search}
      {...props}
    >
      <Icon
        icon={breadcrumb.icon}
        className={breadcrumb.labelClassName + '!text-6xl'}
      >
        {breadcrumb.title}
      </Icon>
    </Link>
  )
}

export default Crumb
