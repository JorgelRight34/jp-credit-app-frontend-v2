import { IconName } from "@/models";


export interface NavItem {
    name: string,
    icon: IconName,
    route: string,
    children?: NavItem[],
};