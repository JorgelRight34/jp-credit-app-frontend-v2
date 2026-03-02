import type { ElementType } from "react";
import type { IconName } from "@/components/atoms/icon/models/iconName";
import type { Route, RouteParams } from "@/components/atoms";

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
    params?: RouteParams;
    component: ElementType;
} 