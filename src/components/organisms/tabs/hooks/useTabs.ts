import { Children, isValidElement, startTransition, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TabProps } from "../components/tab";

export interface UseTabsProps {
  children: ReactNode;
  defaultActiveKey?: string;
  getDefaultActiveKey?: () => string;
  onSelect?: (tab: string | null, index: number) => unknown;
}

export const useTabs = ({ defaultActiveKey, children, onSelect, getDefaultActiveKey }: UseTabsProps) => {
  const tabsArray = useMemo(
    () =>
      Children.toArray(children).filter(
        isValidElement<TabProps>,
      ),
    [children],
  );

  const defaultActiveIndex = useMemo(() => {
    const key = getDefaultActiveKey?.() ?? defaultActiveKey;
    if (key)
      return (
        tabsArray.findIndex((el) => el.props.eventKey === key)
      );
    return 0;
  }, [tabsArray, defaultActiveKey, getDefaultActiveKey]);

  const [activeIndex, setActiveIndex] = useState<number | undefined>(defaultActiveIndex);
  const [renderedTabs, setRenderedTabs] = useState<Array<number | string>>([defaultActiveIndex])

  const handleOnSelect = (index: number) => {
    const eventKey = tabsArray[index].props.eventKey;
    if (!eventKey) return;
    setActiveIndex(index)

    startTransition(() => {
      onSelect?.(eventKey, index);
      setRenderedTabs(prev => (
        renderedTabs.includes(index) ? prev : [...prev, index]
      ))
    })
  }

  return { activeIndex, renderedTabs, tabsArray, handleOnSelect };
};
