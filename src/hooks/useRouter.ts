import { NavigateOptions, useLocation, useMatches, useNavigate } from "react-router"

export const useRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const matches = useMatches();
    const getCreatePath = () => ""

    const push = (path: string, options?: NavigateOptions) => navigate(path, options)

    return { push, location, matches, getCreatePath, history: window.history }
}