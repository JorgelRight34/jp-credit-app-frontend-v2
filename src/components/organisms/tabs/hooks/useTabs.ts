import { usePathname } from "@/hooks/usePathname";
import { useRouter } from "@/hooks/useRouter";
import { useState } from "react";

interface UseTabsProps {
  defaultActive: number;
  routesMap: Record<number, string>;
  navigate?: boolean;
}

export const useTabs = ({ defaultActive, routesMap, navigate: shouldNavigate }: UseTabsProps) => {
  const pathname = usePathname();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(() => {
    return Number(Object.entries(routesMap).find(
      ([, path]) => pathname.endsWith(path)
    )) ?? defaultActive;
  });

  const [renderedTabs, setRenderedTabs] = useState<(number | string)[]>(defaultActive ? [defaultActive] : [])
  const router = useRouter();

  const handleOnSelect = (index: number) => {
    setActiveIndex(index)

    setRenderedTabs(prev => (
      renderedTabs.includes(index) ? prev : [...prev, index]
    ))

    if (shouldNavigate) {
      router.push(routesMap[index])
    }
  }

  return { handleOnSelect, activeIndex, renderedTabs };
};
