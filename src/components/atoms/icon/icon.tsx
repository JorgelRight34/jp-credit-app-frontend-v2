import { Suspense } from 'react'
import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'
import type { IconName } from './iconName'
import { LoadingSpinner } from '@/components/molecules'

/**
 * Props for the Icon component
 * Extends all standard HTML span element attributes
 */
export interface IconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  /** The Google Material Icon name to display */
  icon?: IconName
  /** Optional CSS class name for the icon element */
  className?: string
  /** Optional CSS class name for the label text */
  labelClassName?: string
  /** Optional title attribute for accessibility */
  title?: string
  /** Optional label text or React element to display alongside the icon */
  label?: string | ReactNode
  /** Optional CSS class name for the wrapper element */
  wrapperClassName?: string
  /** Whether to show a loading spinner alongside the label */
  showLoadingSpinner?: boolean
  /** Content to display instead of the label when not showing loading spinner */
  loadingSpinnerReplace?: string | ReactNode
  /** Optional badge content to display over the icon */
  badge?: string | number | ReactNode
  /** Optional data-title attribute for tooltips or accessibility */
  dataTitle?: string
  /** Position of the icon relative to the label */
  orientation?: 'left' | 'right'
  iconClassName?: string
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
  label,
  icon,
  className = '',
  labelClassName = '',
  wrapperClassName = '',
  iconClassName,
  dataTitle,
  orientation = 'left',
  showLoadingSpinner = false,
  loadingSpinnerReplace,
  badge,
  as,
  title,
  children,
  style,
  onClick,
  ...props
}: IconProps) => {
  /**
   * Renders the Material Design icon element
   * @returns JSX span element containing the icon
   */
  const Component = as ?? 'span'
  const IconComponent = icon

  const renderIcon = () => {
    if (!IconComponent) return

    return (
      <Suspense fallback={null}>
        <IconComponent
          className={clsx('google-icon', className, iconClassName)}
          style={style}
        />
      </Suspense>
    )
  }

  return (
    <Component
      className={wrapperClassName}
      title={props['data-title' as keyof typeof props] || dataTitle || title}
      onClick={onClick}
    >
      <span className="relative flex items-center justify-center">
        {/* Render icon on the left side */}
        {orientation === 'left' && renderIcon()}

        {/* Render label with optional loading spinner */}
        {((label ?? children) || loadingSpinnerReplace) && (
          <span
            className={clsx(
              `font-normal ${
                orientation === 'left' ? 'ms-2' : 'mr-2'
              } text-truncate min-w-0 flex-shrink-1`,
              labelClassName,
              className,
            )}
            {...props}
          >
            {label ?? children} {showLoadingSpinner && <LoadingSpinner />}{' '}
            {!showLoadingSpinner && loadingSpinnerReplace}
          </span>
        )}

        {/* Render badge at top-right corner of icon */}
        {badge !== undefined && (
          <span className="badge rounded-pill bg-dark-green absolute -right-1 translate-x-1/2 -translate-y-1/2">
            {badge}
          </span>
        )}

        {/* Render icon on the right side */}
        {orientation === 'right' && renderIcon()}
      </span>
    </Component>
  )
}

export default Icon
