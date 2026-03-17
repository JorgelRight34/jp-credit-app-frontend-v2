import clsx from 'clsx'
import Icon, { IconProps } from '../../icon/components/icon'
import type { ElementType, ReactNode } from 'react'
import type { IconName } from '../../icon/models/iconName'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  labelClassName?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  icon?: IconName
  iconDirection?: IconProps['orientation']
  as?: ElementType
}

const Button = ({
  as: Component = 'button',
  children,
  className,
  type = 'button',
  disabled,
  labelClassName,
  iconDirection,
  icon,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Component
      className={clsx(
        `flex inline w-full cursor-pointer items-center justify-center rounded-xl p-1 text-white shadow-sm md:p-2`,
        className,
        { '!cursor-not-allowed !opacity-50': disabled },
      )}
      type={type}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {icon ? (
        <Icon
          icon={icon}
          orientation={iconDirection}
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
