import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

/**
 * Union type defining all available Google Material Icons
 * 
 * This type restricts icon names to a predefined set of Google Material Icons
 * that are used throughout the application. Each string corresponds to a specific
 * Material Design icon name.
 * 
 * @typedef {string} IconName
 * 
 * @example
 * // Valid usage
 * const iconName: GoogleIcon = "schedule";
 * const userIcon: GoogleIcon = "person";
 * 
 * // Invalid usage (TypeScript will error)
 * const invalidIcon: IconName = "nonexistent_icon"; // Error!
 */
export type IconName = OverridableComponent<SvgIconTypeMap> | null;