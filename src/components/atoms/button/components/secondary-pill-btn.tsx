import clsx from 'clsx'
import SecondaryBtn from './secondary-btn'
import type { SecondaryBtnProps } from './secondary-btn'

export type SecondaryPillBtnProps = SecondaryBtnProps

const SecondaryPillBtn = ({ className, ...props }: SecondaryPillBtnProps) => {
  return (
    <SecondaryBtn
      className={clsx('px-6 !rounded-full', className)}
      {...props}
    />
  )
}

export default SecondaryPillBtn
