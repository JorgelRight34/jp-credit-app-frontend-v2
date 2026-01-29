import type { IconName } from "@/components/atoms/icon/iconName";

export interface BreadcrumbSpec {
    title?: string | number;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    pathname: string;
    icon: IconName;
}
