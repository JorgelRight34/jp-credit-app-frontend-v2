import { IS_DEV_MODE } from "@/lib/utils/constants";
import { useEffect, useRef } from "react"

export const useUpdateEffect = (effect: (() => void), deps: unknown[]) => {
    const mounted = useRef(false);
    const developmentCount = useRef(0);

    useEffect(() => {
        if (mounted.current) {
            return effect();
        }

        if (IS_DEV_MODE) {
            if (developmentCount.current > 0) {
                mounted.current = true;
            }
            developmentCount.current += 1;
        } else {
            mounted.current = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}