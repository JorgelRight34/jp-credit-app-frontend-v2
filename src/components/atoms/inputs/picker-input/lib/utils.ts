import { ReactNode } from "react"
import { DataPickerInputProps } from "../models/dataPickerInputProps"
import { Query } from "@/components/organisms";
import { InputProps } from "../../input/components/input";

type PickerInputComponent<T extends object, TQuery extends Query> = (props: DataPickerInputProps<T, TQuery>) => ReactNode;

export function createPickerInputWithOnSelect<T extends object, TQuery extends Query>(Picker: PickerInputComponent<T, TQuery>, onSelect: (value: T | null) => void) {
    return (props: InputProps) => Picker({ ...props, onSelect });
}