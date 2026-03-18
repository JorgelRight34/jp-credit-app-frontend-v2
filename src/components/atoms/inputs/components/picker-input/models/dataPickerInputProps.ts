import { DataTableContainerOverrides, Query } from "@/components/organisms";
import { InputProps } from "../../input/components/input";
import { ReactNode } from "react";

export interface DataPickerInputProps<T extends object, TQuery extends Query> extends InputProps {
    onSelect?: (value: T | null) => void;
    config?: DataTableContainerOverrides<T, TQuery>;
}

export type PickerInputElement<T extends object = object, TQuery extends Query = Query> = (props: DataPickerInputProps<T, TQuery>) => ReactNode;