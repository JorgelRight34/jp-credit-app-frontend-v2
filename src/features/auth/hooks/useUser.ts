import { usersQueryKey } from "../lib/constants";
import { getUser } from "../services/userClient";
import { useData } from "@/hooks/useData";

interface UseUserProps {
    id?: number;
}

export const useUser = ({ id }: UseUserProps) => {
    const { data, isLoading, isError } = useData({
        key: [...usersQueryKey, id],
        getData: () => getUser(id!),
        enabled: !!id
    })

    return { user: data, isLoading, isError }
}