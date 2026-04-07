import clsx from 'clsx'
import AccentBtn from './accent-btn'
import type { AccentBtnProps } from './accent-btn'
import Link, { LinkProps } from '../../navigation/link'

export type AccentPillBtnProps = AccentBtnProps

const AccentPillBtn = ({ className, ...props }: AccentPillBtnProps) => {
  return (
    <AccentBtn className={clsx('!rounded-full !px-6', className)} {...props} />
  )
}

export const AccentPillLinkBtn = ({
  className,
  to,
  disabled,
  ...props
}: AccentPillBtnProps & LinkProps) => {
  return (
    <Link to={to} disabled={disabled}>
      <AccentBtn
        className={clsx('!rounded-full !px-6', className)}
        disabled={disabled}
        {...props}
      />
    </Link>
  )
}

export default AccentPillBtn
