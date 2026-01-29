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
      className={clsx('flex items-center', {
        '!cursor-pointer': !isLast,
        'text-accent-secondary': isLast,
        'opacity-50': breadcrumb.disabled,
      })}
      underline="none"
      color={isLast ? '' : 'inherit'}
      aria-current={isLast ? 'page' : undefined}
      to={breadcrumb.disabled ? '' : breadcrumb.pathname}
      {...props}
    >
      <Icon
        icon={breadcrumb.icon}
        label={breadcrumb.title}
        labelClassName={breadcrumb.labelClassName}
      />
    </Link>
  )
}

export default Crumb
