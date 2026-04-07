import type { LinkProps, Route, Search } from "@/components";
import type { IconName } from "@/components/atoms/icon/models/iconName";

export interface NavItem {
    name: string,
    route: Route,
    search?: Search,
    children?: Array<NavItem>,
    activeOptions?: LinkProps["activeOptions"]
    parentIndex?: number;
    icon: IconName,
}