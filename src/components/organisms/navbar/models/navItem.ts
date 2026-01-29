import type { IconName } from "@/components/atoms/icon/iconName";
import type { Route } from "@/components/atoms/navigation/link";


export interface NavItem {
    name: string,
    icon: IconName,
    route: Route,
    children?: Array<NavItem>,
};