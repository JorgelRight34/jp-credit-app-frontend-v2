import { usersQueryKey } from "../lib/constants";
import { getUser } from "../services/userService";
import { useData } from "@/hooks/useData";

interface UseUserProps {
    id?: number | string;
}

export const useUser = ({ id }: UseUserProps) => {
    const numericId = Number(id);

    const { data, isLoading, isError } = useData({
        key: [...usersQueryKey, numericId],
        getData: () => getUser(numericId),
        enabled: !!numericId
    })

    return { user: data, isLoading, isError }
}