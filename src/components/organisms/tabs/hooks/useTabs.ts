import { Children, startTransition, useState, useTransition } from "react";
import type { ReactElement, ReactNode } from "react";
import type { TabProps } from "../components/tab";

export interface UseTabsProps {
  children: ReactNode;
  defaultActiveKey?: string;
  getDefaultActiveKey?: () => string;
  onSelect?: (tab: string | null, index: number) => unknown;
}

export const useTabs = ({ defaultActiveKey, children, onSelect, getDefaultActiveKey }: UseTabsProps) => {
  const tabsArray = Children.toArray(children) as ReactElement<TabProps, string>[];

  const [activeIndex, setActiveIndex] = useState(() => {
    const key = getDefaultActiveKey?.() ?? defaultActiveKey;
    return key ? tabsArray.findIndex((el) => el.props.eventKey === key) : 0
  });
  const [renderedTabs, setRenderedTabs] = useState<Record<number, boolean>>({ [activeIndex]: true });
  const [panelIndex, setPanelIndex] = useState(activeIndex);
  const [isPending, startTransitionForPanelIndex] = useTransition();

  const handleOnSelect = (index: number) => {
    setActiveIndex(index)

    startTransition(() => {
      onSelect?.(tabsArray[index].props.eventKey ?? null, index);
    })

    if (renderedTabs[index] === true) {
      setPanelIndex(index)
    } else {
      setPanelIndex(index);
      if (tabsArray[index].props.forceRender !== true) {
        startTransitionForPanelIndex(() => setRenderedTabs(prev => ({ ...prev, [index]: true })))
      }
    }
  }

  return { activeIndex, renderedTabs, tabsArray, isPending, panelIndex, handleOnSelect };
};
