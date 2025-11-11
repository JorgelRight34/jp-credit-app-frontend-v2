/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheKey } from "./cacheKey";
import { IconName } from "./iconName";

export interface BreadcrumbSpec<
    T = any,
    P extends Record<string, any> = Record<string, any>
> {
    title?: string;
    icon?: IconName;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    pathname?: string;
    loader?: {
        callback: (params: P) => Promise<T>;
        titleAccessor: (data: Awaited<ReturnType<() => Promise<T>>>) => string;
        loaderCacheKey: (data: Awaited<ReturnType<() => Promise<T>>>) => CacheKey;
    };
}
