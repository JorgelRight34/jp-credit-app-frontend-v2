import clsx from 'clsx'
import AccentBtn from './accent-btn'
import type { AccentBtnProps } from './accent-btn'
import Link, { LinkProps } from '../../navigation/link'

export type AccentPillBtnProps = AccentBtnProps

const AccentPillBtn = ({ className, ...props }: AccentPillBtnProps) => {
  return (
    <AccentBtn className={clsx('px-6 !rounded-full', className)} {...props} />
  )
}

export const AccentPillLinkBtn = ({
  className,
  to,
  ...props
}: AccentPillBtnProps & LinkProps) => {
  return (
    <Link to={to}>
      <AccentBtn className={clsx('px-6 !rounded-full', className)} {...props} />
    </Link>
  )
}

export default AccentPillBtn
