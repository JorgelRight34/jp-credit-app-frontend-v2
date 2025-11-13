import { ElementType, useRef } from "react";
import { ButtonProps } from "./Button";
import { Menu } from "@/components/molecules";
import { MenuOption, MenuRef } from "@/components/molecules/menu/Menu";
import Icon from "../icon/Icon";

export type SplitBtnProps = ButtonProps & {
  options: MenuOption[];
  Button: ElementType<ButtonProps>;
};

const SplitBtn = ({
  options,
  Button,
  children,
  onClick,
  ...props
}: SplitBtnProps) => {
  const menuRef = useRef<MenuRef>(null);

  return (
    <span className="flex">
      <Button {...props} className="!py-0 !pr-0">
        <span className="flex items-center !py-0">
          <span className="border-r py-2 pr-3" onClick={onClick}>
            {children}
          </span>
          <button
            className="flex justify-center px-2"
            onClick={(e) => menuRef.current?.open(e)}
          >
            <Icon icon="arrow_circle_down" />
          </button>
        </span>
      </Button>
      <Menu ref={menuRef} options={options} />
    </span>
  );
};

export default SplitBtn;
