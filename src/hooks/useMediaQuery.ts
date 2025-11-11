import { useEffect, useState } from "react"

export const useMediaQuery = (breakpoint: number) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setIsValid(window.innerWidth < breakpoint)
        }

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize)
    }, [breakpoint])

    return isValid;
}