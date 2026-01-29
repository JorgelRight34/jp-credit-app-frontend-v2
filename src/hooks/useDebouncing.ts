import { useCallback, useRef } from "react"

export const useDebouncing = <T extends (...args: Array<any>) => void>(
    func: T,
    ms: number = 1000
) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const memoizedFn = useCallback(func, []);

    const debouncedFn = useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            memoizedFn(...args);
        }, ms);
    }, [memoizedFn, ms])

    return debouncedFn
}