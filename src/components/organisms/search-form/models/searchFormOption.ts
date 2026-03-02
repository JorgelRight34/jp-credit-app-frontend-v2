import type { ReactNode } from "react";
import type { FieldValues, SchemaType, UseFormSetValue } from "../../form";
import { Path } from "react-hook-form";

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
    watchedValues?: Array<Path<T>>;
    onWatchedValuesChange?: (form: T, setForm: UseFormSetValue<T>) => void;
}