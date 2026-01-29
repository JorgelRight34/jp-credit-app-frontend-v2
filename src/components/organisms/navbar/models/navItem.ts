import type { Route } from "@/components";
import type { IconName } from "@/components/atoms/icon/iconName";

export interface NavItem {
    name: string,
    route: Route,
    children?: Array<NavItem>,
    icon: IconName,
}