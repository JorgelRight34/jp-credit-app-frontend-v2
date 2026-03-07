import { DataTableConfig } from "@/components/organisms";

export type BuildSearchInputDataTableConfigHandler<T> = (onRowClick: (v: T) => void) => DataTableConfig<T>