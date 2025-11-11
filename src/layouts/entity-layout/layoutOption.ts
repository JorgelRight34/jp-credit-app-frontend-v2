import { IconName } from "@/models";
import { ElementType } from "react";

export interface LayoutOption {
    title?: string;
    icon?: IconName;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    variation?: "secondary" | "accent" | "light"
    show?: boolean;
    tooltip?: string;
    component?: ElementType;
    selectProps?: {
        options: (LayoutOption & { value: string | number })[];
        value?: string | number;
        onChange: (val?: string | number) => void;
    }
} 