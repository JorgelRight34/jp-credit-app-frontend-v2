import { useRef } from "react";
import EntityLayoutOption from "./EntityLayoutOption";
import Menu, { MenuRef } from "@/components/ui/Menu";
import LightBtn from "@/components/ui/LightBtn";
import {
  useEntityLayoutOptions,
  UseEntityLayoutOptionsProps,
} from "./useEntityLayoutOptions";

export type EntityLayoutTopOptionsProps = UseEntityLayoutOptionsProps;

const EntityLayoutTopOptions = ({ ...props }: EntityLayoutTopOptionsProps) => {
  const options = useEntityLayoutOptions({ ...props });
  const menuRef = useRef<MenuRef>(null);

  return (
    <>
      {/* Options */}
      <div className="hidden items-center gap-3 md:flex">
        {options.map((option, index) => (
          <EntityLayoutOption key={index} option={option} />
        ))}
      </div>
      <div className="ml-auto block md:hidden">
        <LightBtn
          icon="arrow_downward"
          onClick={(e) => menuRef.current?.open(e)}
        >
          Opciones
        </LightBtn>
        <Menu
          ref={menuRef}
          options={options
            .filter((el) => el.show)
            .map((el) => ({ ...el, label: el.title ?? "" }))}
        />
      </div>
    </>
  );
};

export default EntityLayoutTopOptions;
