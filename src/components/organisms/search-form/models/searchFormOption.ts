import type { ReactNode } from "react";
import type { DefaultFormValues, SchemaType } from "../../form";

export type SearchFormOption<T> = {
    name: keyof T;
    label: string;
    width: number;
    searchOnChange?: boolean;
    type: (props: any) => ReactNode;
}

export interface SearchFormConfig<T> {
    options: Array<SearchFormOption<T>>;
    advanced: Array<SearchFormOption<T>>;
    defaultValues: DefaultFormValues<T>;
    schema?: SchemaType<T>;
}