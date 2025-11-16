import { useData } from "@/hooks/useData";
import { BreadcrumbSpec, CacheKey } from "@/models";

interface UseBreadProps {
    breadcrumb: BreadcrumbSpec;
    params?: Record<string, unknown>;
}

export const useBreadCrumb = ({ breadcrumb, params }: UseBreadProps) => {
    const loader = breadcrumb.loader;
    const hasLoader = !!breadcrumb.loader;

    const { data, isLoading, isError } = useData({
        key: (breadcrumb.loader?.loaderCacheKey(params) ?? []) as CacheKey,
        getData: () => breadcrumb.loader!.callback(params ?? {}),
        enabled: hasLoader,
    });

    return {
        title: (hasLoader && data) ? loader?.titleAccessor(data) ?? "..." : breadcrumb.title,
        isLoading,
        isError,
        icon: breadcrumb.icon
    };
};
