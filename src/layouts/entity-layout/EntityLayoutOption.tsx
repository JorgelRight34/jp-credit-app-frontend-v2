import { AccentBtn, AppLink, SecondaryBtn } from "@/components/ui";
import { LayoutOption } from "./layoutOption";
import LightBtn from "@/components/ui/LightBtn";
import { ButtonProps } from "@/components/ui/Button";
import SelectInput from "@/components/EntityForm/inputs/SelectInput";

interface EntityLayoutOptionProps extends ButtonProps {
  option: LayoutOption;
}

const buttonComponents = {
  accent: AccentBtn,
  secondary: SecondaryBtn,
  light: LightBtn,
};

const EntityLayoutOption = ({ option, ...props }: EntityLayoutOptionProps) => {
  const Component = buttonComponents[option.variation ?? "light"];

  const render = () => (
    <Component
      className="hidden md:inline"
      onClick={option.onClick}
      icon={option.icon}
      title={option.tooltip}
      {...props}
    >
      {option.title}
    </Component>
  );

  if (option.show === false) return;

  if (option.href) return <AppLink to={option.href}>{render()}</AppLink>;

  if (option.selectProps?.options) {
    return (
      <div className="w-40">
        <SelectInput
          value={option.selectProps.value}
          onChange={option.selectProps.onChange}
          label={option.title}
          options={option.selectProps.options
            .filter((o) => o.value !== undefined && o.title !== undefined)
            .map((o) => [o.value!, o.title!])}
        />
      </div>
    );
  }

  if (option.component) {
    return <option.component children={render()} />;
  }

  return render();
};

export default EntityLayoutOption;
