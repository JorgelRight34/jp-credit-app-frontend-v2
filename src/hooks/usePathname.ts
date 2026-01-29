import { useRouter } from "@tanstack/react-router";

export const usePathname = () => {
    const router = useRouter();
    return router.state.location.pathname;
};
