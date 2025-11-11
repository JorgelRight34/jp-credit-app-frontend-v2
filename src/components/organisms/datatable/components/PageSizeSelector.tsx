import SelectInput, {
  SelectInputProps,
} from "../../EntityForm/inputs/SelectInput";

const PageSizeSelector = ({ ...props }: SelectInputProps) => {
  return (
    <SelectInput
      label={`Items`}
      allowNoOption={false}
      {...props}
      options={[
        [10, 10],
        [20, 20],
        [25, 25],
        [50, 50],
        [100, 100],
      ]}
    />
  );
};

export default PageSizeSelector;
