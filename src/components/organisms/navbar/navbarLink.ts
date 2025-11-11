import { IconName } from "@/models";


export interface NavbarLink {
    name: string,
    icon: IconName,
    route: string,
    children?: NavbarLink[],
};