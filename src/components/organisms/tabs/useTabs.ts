import { useRouter } from "@/hooks/useRouter";
import { useCallback, useEffect, useState } from "react";

interface UseTabsProps {
  defaultActive: number;
  routesMap: Record<number, string>;
  navigate?: boolean;
}

const useTabs = ({ defaultActive, routesMap, navigate: shouldNavigate }: UseTabsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [renderedTabs, setRenderedTabs] = useState<(number | string)[]>(defaultActive ? [defaultActive] : [])
  const router = useRouter();

  const handleOnSelect = useCallback((index: number) => {
    setActiveIndex(index)

    setRenderedTabs(prev => (
      renderedTabs.includes(index) ? prev : [...prev, index]
    ))

    if (shouldNavigate) {
      router.push(routesMap[index])
    }
  }, [renderedTabs, router, routesMap, shouldNavigate])

  useEffect(() => {
    const currentPath = router.location.pathname
    const foundIndex = Object.entries(routesMap).find(
      ([, path]) => currentPath.endsWith(path)
    );

    if (foundIndex) {
      handleOnSelect(Number(foundIndex[0]));
    } else {
      handleOnSelect(defaultActive)
    }
  }, [defaultActive, handleOnSelect, router.location, routesMap])


  return { handleOnSelect, activeIndex, renderedTabs };
};

export default useTabs;
