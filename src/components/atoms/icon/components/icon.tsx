import type { ElementType } from 'react'
import type { IconName } from '../models/iconName'
import { SvgIconProps } from '@mui/material'

/**
 * Props for the Icon component
 * Extends all standard HTML span element attributes
 */
export interface IconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  /** The Google Material Icon name to display */
  icon?: IconName
  /** Optional CSS class name for the icon element */
  className?: string
  /** Optional title attribute for accessibility */
  title?: string
  /** Optional CSS class name for the wrapper element */
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
  className = '',
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
      <span className={`flex w-full items-center gap-2 ${className}`}>
        {IconComponent && <IconComponent className={className} style={style} />}
        {children}
      </span>
    </Component>
  )
}

export default Icon
