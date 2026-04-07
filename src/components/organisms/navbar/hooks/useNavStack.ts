import { startTransition, useCallback, useRef, useState } from "react";
import { NavItem } from "../models/navItem";

export const useNavStack = () => {
    const navStack = useRef<NavItem[]>([])
    const [activeNavIndex, setActiveNavIndex] = useState(-1)

    const goDeeper = useCallback((nav?: NavItem) => {
        if (!nav?.children?.length) return
        navStack.current[activeNavIndex + 1] = nav
        startTransition(() => setActiveNavIndex(i => i + 1))
    }, [activeNavIndex])

    const goBack = useCallback(() => {
        startTransition(() => setActiveNavIndex(i => Math.max(i - 1, -1)))
    }, [])

    return [activeNavIndex >= 0 ? navStack.current[activeNavIndex] : undefined, goDeeper, goBack] as const
}