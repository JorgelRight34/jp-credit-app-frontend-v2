import { useSyncExternalStore } from "react"

export const useWindowBreakpoint = (breakpoint: number) => {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener('resize', callback);
            return () => window.removeEventListener('resize', callback);
        },
        () => window.innerWidth < breakpoint,
        () => false
    )
}