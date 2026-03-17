import clsx from 'clsx'
import LightBtn from './light-btn'
import type { LightBtnProps } from './light-btn'
import Link, { LinkProps } from '../../navigation/link'

export type LightPillBtnProps = LightBtnProps

const LightPillBtn = ({ className, ...props }: LightPillBtnProps) => {
  return (
    <LightBtn className={clsx('!rounded-full !px-6', className)} {...props} />
  )
}

export const LightPillLinkBtn = ({
  className,
  to,
  ...props
}: LightPillBtnProps & LinkProps) => {
  return (
    <Link to={to}>
      <LightBtn className={clsx('!rounded-full !px-6', className)} {...props} />
    </Link>
  )
}

export default LightPillBtn
