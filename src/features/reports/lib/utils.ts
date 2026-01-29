import BookMarkedReportsBtn from "../components/BookmarkedReportsBtn";
import type { LayoutOption } from "@/components/molecules/layouts/entity-layout/layoutOption";
import type { ReportKey } from "../models/reportKey";
import type { Params } from "@/models/params";

export const reportLayoutOption: Partial<LayoutOption> = {
    title: "Reportes",
    icon: "home_storage",
}

export const createReportLayoutOption = (module: ReportKey, params?: Params): LayoutOption => {
    return {
        title: "Reportes",
        icon: "home_storage",
        component: () => BookMarkedReportsBtn({ reportKey: module, params })
    }
}

export const flattenObject = (obj: object, prefix = "", result: Record<string, unknown> = {}) => {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            flattenObject(value, newKey, result)
        } else {
            result[newKey] = value
        }
    }
    return result;
}