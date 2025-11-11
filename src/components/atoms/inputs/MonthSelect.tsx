import SelectInput, { SelectInputProps } from "./SelectInput";
import { months } from "@/utils/constants";

type MonthSelectProps = SelectInputProps;

const MonthSelect = ({ ...props }: MonthSelectProps) => {
  return (
    <SelectInput
      {...props}
      defaultValue={new Date().getMonth()}
      options={months.map((month, index) => [index, month])}
    />
  );
};

export default MonthSelect;
