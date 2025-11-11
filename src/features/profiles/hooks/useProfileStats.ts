import { useData } from "@/hooks/useData";
import { fetchProfileStats } from "../services/profilesClient";

const useProfileStats = (userId?: number) => {
    const { data, isError, isLoading } = useData({
        key: ["stats", userId],
        getData: () => fetchProfileStats(userId!),
        enabled: !!userId
    });

    return { stats: data || undefined, isError, isLoading };
};

export default useProfileStats;
