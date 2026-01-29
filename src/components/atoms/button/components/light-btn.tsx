import clsx from 'clsx'
import Button from './button'
import type { ButtonProps } from './button'

type LightBtnProps = ButtonProps

/**
 * Accent-styled button component.
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @example <LightBtn>Submit</LightBtn>
 * @example <LightBtn className="ml-4" onClick={handleClick}>Confirm</LightBtn>
 */
const LightBtn = ({ className, ...props }: LightBtnProps) => {
  return (
    <Button
      className={clsx('btn-light border !bg-white', className)}
      {...props}
    />
  )
}

export default LightBtn
