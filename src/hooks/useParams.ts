import { useParams as useReactRouterParams } from "react-router"

export const useParams = () => {
    const params = useReactRouterParams()

    return params
}