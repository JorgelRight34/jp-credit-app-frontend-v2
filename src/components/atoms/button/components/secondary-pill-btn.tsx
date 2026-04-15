import clsx from 'clsx'
import SecondaryBtn from './secondary-btn'
import type { SecondaryBtnProps } from './secondary-btn'

export type SecondaryPillBtnProps = SecondaryBtnProps

const SecondaryPillBtn = ({ className, ...props }: SecondaryPillBtnProps) => {
  return (
    <SecondaryBtn
      className={clsx('!rounded-full !px-6', className)}
      {...props}
    />
  )
}

export default SecondaryPillBtn
