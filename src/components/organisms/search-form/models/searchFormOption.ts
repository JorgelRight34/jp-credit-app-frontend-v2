import type { ReactNode } from "react";
import type { FieldValues, SchemaType } from "../../form";
import { ExportHandler } from "@/components/molecules";

export type SearchFormOption<T> = {
    name: keyof T;
    label: string;
    width: number;
    searchOnChange?: boolean;
    type: (props: any) => ReactNode;
}

export interface SearchFormConfig<T extends FieldValues> {
    options: Array<SearchFormOption<T>>;
    advanced: Array<SearchFormOption<T>>;
    schema?: SchemaType<T>;
    onExport?: ExportHandler<T>
}