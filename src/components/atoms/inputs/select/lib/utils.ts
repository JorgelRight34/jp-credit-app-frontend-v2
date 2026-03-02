import { Select } from "../..";
import { SelectInputProps } from "../select";
import { SelectOptions } from "../select-option";

export const buildSelectWithOptions = (options: SelectOptions) => {
    return (props: SelectInputProps) => Select({ ...props, options })
}