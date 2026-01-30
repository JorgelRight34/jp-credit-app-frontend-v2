import type { ElementType } from "react";
import type { IconName } from "@/components/atoms/icon/iconName";
import type { Route } from "@/components/atoms";

export interface LayoutOption {
    title?: string;
    href?: string;
    disabled?: boolean;
    variation?: "secondary" | "accent" | "light"
    show?: boolean;
    tooltip?: string;
    icon?: IconName;
    onClick?: () => void;
    to?: Route;
    component: ElementType;
} 