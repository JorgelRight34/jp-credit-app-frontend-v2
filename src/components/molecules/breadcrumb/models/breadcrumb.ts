import type { IconName } from "@/components/atoms/icon/models/iconName";
import type { Route, RouteParams, Search } from "@/components/atoms";
import { ReactNode } from "react";

export interface BreadcrumbSpec {
    title?: ReactNode;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    pathname?: Route;
    params?: RouteParams;
    search?: Search;
    icon: IconName;
}
