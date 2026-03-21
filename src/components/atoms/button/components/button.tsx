import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  as?: ElementType
}

const Button = ({
  as: Component = 'button',
  children,
  className,
  type = 'button',
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Component
      className={clsx(
        `flex inline w-full cursor-pointer items-center justify-center rounded-xl p-1 text-white shadow-sm md:p-2`,
        className,
        { '!pointer-events-none !cursor-not-allowed !opacity-50': disabled },
      )}
      type={type}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
