import type { Route, Search } from "@/components";
import type { IconName } from "@/components/atoms/icon/iconName";

export interface NavItem {
    name: string,
    route: Route,
    search?: Search,
    children?: Array<NavItem>,
    icon: IconName,
}