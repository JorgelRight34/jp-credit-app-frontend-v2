import { Children, isValidElement, startTransition, useMemo, useState, useTransition } from "react";
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

  const [activeIndex, setActiveIndex] = useState(() => {
    const key = getDefaultActiveKey?.() ?? defaultActiveKey;
    return key ? tabsArray.findIndex((el) => el.props.eventKey === key) : 0
  });
  const [renderedTabs, setRenderedTabs] = useState<Record<number, boolean>>({ [activeIndex]: true });
  const [panelIndex, setPanelIndex] = useState(activeIndex);
  const [isPending, startTransitionForPanelIndex] = useTransition();

  const handleOnSelect = (index: number) => {
    setActiveIndex(index)

    if (renderedTabs[index] === true) {
      setPanelIndex(index)
    } else {
      startTransitionForPanelIndex(() => {
        setPanelIndex(index);
        setRenderedTabs(prev => ({ ...prev, [index]: true }));
      })
    }

    startTransition(() => {
      onSelect?.(tabsArray[index].props.eventKey ?? null, index);
    })
  }

  return { activeIndex, renderedTabs, tabsArray, isPending, panelIndex, handleOnSelect };
};
