import { Icon } from "@/components/atoms";
import clsx from "clsx";
import { ElementType } from "react";

interface ShowAllFiltersTriggerProps
  extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  showAll: boolean;
  toggle: () => void;
  Component?: ElementType;
}

const ShowAllFiltersTrigger = ({
  showAll,
  Component,
  className,
  toggle,
  ...props
}: ShowAllFiltersTriggerProps) => {
  return (
    <span
      onClick={toggle}
      className={clsx("px-2 md:px-0", className, showAll ? "opacity-40" : "")}
      {...props}
    >
      {Component ? (
        <Component>
          <Icon icon={showAll ? "filter_list_off" : "filter_list"} />
        </Component>
      ) : (
        <Icon icon={showAll ? "filter_list_off" : "filter_list"} />
      )}
    </span>
  );
};

export default ShowAllFiltersTrigger;
