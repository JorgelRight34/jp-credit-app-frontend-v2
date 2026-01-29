import clsx from 'clsx'
import Button from './button'
import type { ButtonProps } from './button'

export type SecondaryBtnProps = ButtonProps

/**
 * Accent-styled button component.
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @example <SecondaryBtn>Submit</SecondaryBtn>
 * @example <SecondaryBtn className="ml-4" onClick={handleClick}>Confirm</SecondaryBtn>
 */
const SecondaryBtn = ({ className, ...props }: SecondaryBtnProps) => {
  return (
    <Button className={clsx('btn-accent-secondary', className)} {...props} />
  )
}

export default SecondaryBtn
