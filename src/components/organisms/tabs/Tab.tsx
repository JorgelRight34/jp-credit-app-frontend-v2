import { IconName } from "@/models";
import { Tab as RTab, TabProps as RTabProps } from "react-tabs";
import { Icon } from "../ui";
import { ReactNode } from "react";

export type TabProps = Omit<RTabProps, "title"> & {
  path?: string;
  icon?: IconName;
  title?: ReactNode;
};

const Tab = ({ title, icon, ...props }: TabProps) => {
  return (
    <RTab {...props}>{icon ? <Icon icon={icon}>{title}</Icon> : title}</RTab>
  );
};

Object.assign(Tab, RTab);

export default Tab;
