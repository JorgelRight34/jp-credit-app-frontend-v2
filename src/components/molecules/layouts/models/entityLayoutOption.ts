import type { ElementType } from "react";
import type { IconName } from "@/components/atoms/icon/iconName";

export interface LayoutOption {
    title?: string;
    href?: string;
    disabled?: boolean;
    variation?: "secondary" | "accent" | "light"
    show?: boolean;
    tooltip?: string;
    icon?: IconName;
    onClick?: () => void;
    component: ElementType;
} 