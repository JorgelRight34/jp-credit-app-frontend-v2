import { Children, isValidElement, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TabProps } from "../components/tab";

export interface UseTabsProps {
  children: ReactNode;
  defaultActiveKey: string;
  onSelect?: (tab: string | null, index: number) => Promise<void | boolean>;
}

export const useTabs = ({ defaultActiveKey, children, onSelect }: UseTabsProps) => {
  const tabsArray = useMemo(
    () =>
      Children.toArray(children).filter(
        isValidElement<TabProps>,
      ),
    [children],
  );

  const defaultActiveIndex = useMemo(() => {
    if (defaultActiveKey)
      return (
        tabsArray.findIndex((el) => el.props.eventKey === defaultActiveKey)
      );
    return 0;
  }, [tabsArray, defaultActiveKey]);

  const [activeIndex, setActiveIndex] = useState<number | undefined>(defaultActiveIndex);
  const [renderedTabs, setRenderedTabs] = useState<Array<number | string>>([defaultActiveIndex])

  const handleOnSelect = async (index: number) => {
    const eventKey = tabsArray[index].props.eventKey;
    if (!eventKey) return;

    const shouldSelect = await onSelect?.(eventKey, index);
    if (shouldSelect === false) return;

    setActiveIndex(index)
    setRenderedTabs(prev => (
      renderedTabs.includes(index) ? prev : [...prev, index]
    ))
  }

  return { activeIndex, renderedTabs, tabsArray, handleOnSelect };
};
