import type { LinkProps } from '@/components/atoms'
import { DateLabel, Link } from '@/components/atoms'

export const createLinkDataCell = (label: string, linkProps: LinkProps) => {
  return (
    <Link className="text-accent-secondary" {...linkProps}>
      {label}
    </Link>
  )
}

export const createDateDataCell = (date: string) => {
  return <DateLabel date={date} />
}
