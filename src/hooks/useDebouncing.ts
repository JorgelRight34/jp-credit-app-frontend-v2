import { useCallback, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncing = <T extends (...args: any[]) => void>(
    func: T,
    ms: number = 1000
) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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