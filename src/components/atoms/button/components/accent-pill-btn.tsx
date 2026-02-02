import clsx from 'clsx'
import AccentBtn from './accent-btn'
import type { AccentBtnProps } from './accent-btn'

export type AccentPillBtnProps = AccentBtnProps

const AccentPillBtn = ({ className, ...props }: AccentPillBtnProps) => {
  return (
    <AccentBtn className={clsx('px-6 !rounded-full', className)} {...props} />
  )
}

export default AccentPillBtn
