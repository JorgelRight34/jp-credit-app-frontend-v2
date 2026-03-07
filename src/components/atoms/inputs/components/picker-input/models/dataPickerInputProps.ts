import { DataTableContainerOverrides, Query } from "@/components/organisms";
import { InputProps } from "../../input/components/input";

export interface DataPickerInputProps<T extends object, TQuery extends Query> extends InputProps {
    onSelect?: (value: T | null) => void;
    datatable?: DataTableContainerOverrides<T, TQuery>
}