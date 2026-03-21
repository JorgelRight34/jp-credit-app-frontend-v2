import type { ElementType } from 'react'
import type { IconName } from '../models/iconName'
import { SvgIconProps } from '@mui/material'

export interface IconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  icon?: IconName
  className?: string
  title?: string
  wrapperClassName?: string
  dataTitle?: string
  as?: ElementType
}

/**
 * A versatile icon component that renders Google Material Icons with extensive customization options.
 *
 * This component provides a comprehensive solution for displaying Material Design icons with
 * optional labels, badges, loading states, and responsive behavior. It supports both left and
 * right orientation for icon placement and includes accessibility features.
 *
 * The component uses Material Symbols Outlined font family for icons.
 */
const Icon = ({
  className = 'justify-center',
  wrapperClassName = '',
  dataTitle,
  as: Component = 'span',
  title,
  children,
  style,
  icon,
  onClick,
  ...props
}: IconProps) => {
  const IconComponent = icon as React.ComponentType<SvgIconProps> | null

  return (
    <Component
      className={wrapperClassName}
      title={props['data-title' as keyof typeof props] || dataTitle || title}
      onClick={onClick}
    >
      <span
        className={`flex !w-auto items-center justify-center gap-2 ${className}`}
      >
        {IconComponent && <IconComponent className={className} style={style} />}
        {children}
      </span>
    </Component>
  )
}

export default Icon
