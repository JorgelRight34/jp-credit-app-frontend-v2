import clsx from 'clsx'
import LightBtn from './light-btn'
import type { LightBtnProps } from './light-btn'

export type LightPillBtnProps = LightBtnProps

const LightPillBtn = ({ className, ...props }: LightPillBtnProps) => {
  return (
    <LightBtn className={clsx('px-6 !rounded-full', className)} {...props} />
  )
}

export default LightPillBtn
