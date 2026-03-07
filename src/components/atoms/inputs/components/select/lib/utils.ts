import { buildFormWatchContainer, FieldValues, FormWatchContainerProps } from "@/components/organisms";
import { Select } from "../../..";
import { SelectInputProps } from "../select";
import { SelectOptions } from "../select-option";

export const withSelectOptions = (options: SelectOptions) => {
    return (props: SelectInputProps) => Select({ ...props, options })
}

export const withFormWatchSelectOptions = <T extends FieldValues>(
    options: SelectOptions, formWatch: FormWatchContainerProps<T>
) => {
    return buildFormWatchContainer(
        formWatch.watchedValues,
        formWatch.onWatchedValuesChange,
        (props: SelectInputProps) => Select({ ...props, options })
    )
}