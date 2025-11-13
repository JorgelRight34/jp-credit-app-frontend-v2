import type { ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";
import clsx from "clsx";
import { IconName } from "@/models";

/**
 * Props for the Icon component
 * Extends all standard HTML span element attributes
 */
export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "title" | "id"> {
  /** The Google Material Icon name to display */
  icon?: IconName;
  /** Optional CSS class name for the icon element */
  className?: string;
  /** Optional CSS class name for the label text */
  labelClassName?: string;
  /** Optional title attribute for accessibility */
  title?: string;
  /** Optional label text or React element to display alongside the icon */
  label?: string | ReactNode;
  /** Optional CSS class name for the wrapper element */
  wrapperClassName?: string;
  /** Whether to show a loading spinner alongside the label */
  showLoadingSpinner?: boolean;
  /** Content to display instead of the label when not showing loading spinner */
  loadingSpinnerReplace?: string | ReactNode;
  /** Optional badge content to display over the icon */
  badge?: string | number | ReactNode;
  /** Optional data-title attribute for tooltips or accessibility */
  dataTitle?: string;
  /** Position of the icon relative to the label */
  orientation?: "left" | "right";
  /** Optional CSS class name specifically for the icon */
  iconClassName?: string;
  /** Size of the icon in rem units */
  size?: number;
  /** Icon variant/style */
  variant?: "outlined" | "filled" | "rounded" | "sharp";
  /** Gap between icon and label */
  gap?: "none" | "xs" | "sm" | "md" | "lg";
}

/**
 * A versatile icon component that renders Google Material Icons with extensive customization options.
 *
 * This component provides a comprehensive solution for displaying Material Design icons with
 * optional labels, loading states, badges, and flexible positioning.
 *
 * @remarks
 * - When no icon is provided, only the label is rendered
 * - When no label is provided, children are used as the label
 * - Supports multiple Material Design icon variants
 * - Size prop properly affects both width and height with font-size scaling
 */
const Icon = ({
  children,
  label,
  icon,
  className = "",
  wrapperClassName = "",
  iconClassName = "",
  dataTitle,
  labelClassName = "",
  orientation = "left",
  onClick,
  showLoadingSpinner = false,
  loadingSpinnerReplace,
  size = 1.5,
  variant = "outlined",
  gap = "sm",
  title,
  ...props
}: IconProps) => {
  // Determine the actual label to display
  const actualLabel = label !== undefined ? label : children;

  // Gap size mapping
  const gapSizes = {
    none: "",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  // Variant class mapping
  const variantClasses = {
    outlined: "material-symbols-outlined",
    filled: "material-symbols-filled",
    rounded: "material-symbols-rounded",
    sharp: "material-symbols-sharp",
  };

  /**
   * Renders the Material Design icon element with proper sizing
   */
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <span
        className={clsx(
          variantClasses[variant],
          "google-icon !no-underline select-none",
          "flex items-center justify-center flex-shrink-0",
          iconClassName
        )}
        style={{
          fontSize: `${size}rem`,
        }}
        aria-hidden={actualLabel ? "true" : "false"}
      >
        {icon}
      </span>
    );
  };

  /**
   * Renders the label with optional loading spinner
   */
  const renderLabel = () => {
    if (!actualLabel && !loadingSpinnerReplace && !showLoadingSpinner) {
      return null;
    }

    return (
      <span
        className={clsx(
          "text-truncate flex-shrink-1 min-w-0 flex items-center gap-1",
          labelClassName
        )}
      >
        {showLoadingSpinner ? (
          <>
            {loadingSpinnerReplace || actualLabel}
            <LoadingSpinner />
          </>
        ) : (
          actualLabel
        )}
      </span>
    );
  };

  // If no icon is provided, render only the label
  if (!icon) {
    return (
      <span
        className={clsx("flex items-center", wrapperClassName, className)}
        title={title || dataTitle}
        onClick={onClick}
        {...props}
      >
        {renderLabel()}
      </span>
    );
  }

  // If no label/children, render only the icon
  if (!actualLabel && !showLoadingSpinner && !loadingSpinnerReplace) {
    return (
      <span
        className={clsx("flex items-center", wrapperClassName, className)}
        title={title || dataTitle}
        onClick={onClick}
        {...props}
      >
        {renderIcon()}
      </span>
    );
  }

  // Render icon with label
  return (
    <span
      className={clsx(
        "flex items-center",
        gapSizes[gap],
        wrapperClassName,
        className
      )}
      title={title || dataTitle}
      onClick={onClick}
      {...props}
    >
      {orientation === "left" ? renderIcon() : ""}
      {renderLabel()}
      {orientation === "right" ? renderIcon() : ""}
    </span>
  );
};

export default Icon;
