import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import useTabs from "./useTabs";
import { Tabs as RTabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tab, { TabProps } from "./Tab";
import { VariationKey, variations } from "./variations";
import clsx from "clsx";

interface EntityTabsProps {
  defaultActiveKey: string;
  children: ReactNode;
  navigate?: boolean;
  tabListClassName?: string;
  tabClassName?: string;
  variation?: VariationKey;
  onSelect?: (tab: string | null) => void;
}

const Tabs = ({
  defaultActiveKey,
  children,
  tabListClassName,
  tabClassName,
  navigate = true,
  variation,
  onSelect,
}: EntityTabsProps) => {
  const tabsArray = useMemo(
    () =>
      Children.toArray(children).filter(
        isValidElement<TabProps>,
      ) as React.ReactElement<TabProps>[],
    [children],
  );

  const defaultActive = useMemo(() => {
    if (defaultActiveKey)
      return (
        tabsArray.findIndex((el) => el.props.path === defaultActiveKey) ?? 0
      );
    return 0;
  }, [defaultActiveKey, tabsArray]);

  const routesMap = useMemo<Record<number, string>>(
    () =>
      Object.fromEntries(
        tabsArray.map((tab, index) => [index, tab.props.path ?? "/"]),
      ),
    [tabsArray],
  );

  const { activeIndex, handleOnSelect, renderedTabs } = useTabs({
    defaultActive,
    routesMap,
    navigate,
  });

  const variationClassName = useMemo(
    () => (variation ? variations[variation].tab : null),
    [variation],
  );

  const handleSelect = useCallback(
    (index: number) => {
      const path = tabsArray[index].props.path;
      if (!path) return;

      onSelect?.(path);
      handleOnSelect(index);
    },
    [handleOnSelect, onSelect, tabsArray],
  );

  if (activeIndex === undefined) return <></>;

  return (
    <div className="h-full">
      <RTabs
        selectedIndex={activeIndex}
        onSelect={handleSelect}
        selectedTabClassName="text-accent"
      >
        <TabList
          className={
            tabListClassName ?? variations[variation ?? "default"].list
          }
        >
          {tabsArray.map((tab, index) => (
            <Tab
              className={clsx(variationClassName, tabClassName)}
              {...tab.props}
              key={index}
            >
              {tab.props.title}
            </Tab>
          ))}
        </TabList>
        {tabsArray.map((tab, index) => (
          <TabPanel key={index} forceRender={renderedTabs.includes(index)}>
            {tab.props.children}
          </TabPanel>
        ))}
      </RTabs>
    </div>
  );
};

export default Tabs;
