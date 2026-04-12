import type { ElementType } from "react";
import type { IconName } from "@/components/atoms/icon/models/iconName";
import type { LinkProps, Route } from "@/components/atoms";
import { MenuOption } from "../../menu";

export interface LayoutOption extends MenuOption {
    href?: string;
    disabled?: boolean;
    variation?: "secondary" | "accent" | "light"
    show?: boolean;
    tooltip?: string;
    className?: string;
    to?: Route;
    search?: LinkProps["search"]
    params?: LinkProps["params"];
    options?: Array<MenuOption>
    component: ElementType;
    childOptions?: Array<MenuOption>;
    icon?: IconName;
    onClick?: () => void;
} 