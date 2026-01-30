import type { IconName } from "@/components/atoms/icon/iconName";
import type { Route } from "@/components/atoms";

export interface BreadcrumbSpec {
    title?: string | number;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    pathname: Route;
    icon: IconName;
}
