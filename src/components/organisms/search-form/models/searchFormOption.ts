import type { ReactNode } from "react";
import type { SchemaType } from "../../form";
import type { InputProps } from "@/components/atoms";

export type SearchFormOption<T> = {
    name: keyof T;
    label: string;
    width: number;
    searchOnChange?: boolean;
    type: (props: Pick<InputProps, "onChange">) => ReactNode;
}

export interface SearchFormConfig<T> {
    options: Array<SearchFormOption<T>>;
    advanced: Array<SearchFormOption<T>>;
    schema?: SchemaType<T>;
}