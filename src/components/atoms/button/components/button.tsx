import clsx from 'clsx'
import Icon from '../../icon/icon'
import type { ElementType, ReactNode } from 'react'
import type { IconName } from '../../icon/iconName'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  labelClassName?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  icon?: IconName
  as?: ElementType
}

const Button = ({
  as: Component = 'button',
  children,
  className,
  type = 'button',
  disabled,
  labelClassName,
  icon,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Component
      className={clsx(
        `flex cursor-pointer w-full inline items-center justify-center rounded-xl p-2 text-white shadow-sm`,
        className,
        { '!pointer-events-none !cursor-not-allowed !opacity-50': disabled },
      )}
      type={type}
      title=""
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {icon ? (
        <Icon
          icon={icon}
          wrapperClassName="justify-center !bg-red-500"
          label={children}
          labelClassName={labelClassName}
        />
      ) : (
        children
      )}
    </Component>
  )
}

export default Button
