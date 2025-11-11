
import { getProfile } from "../services/profilesClient";
import { profilesQueryKey } from "../lib/constants";
import { Profile } from "../models/profile";
import { useData } from "@/hooks/useData";

interface UseProfileProps {
    id?: number | string;
}

interface UseProfileReturn {
    profile?: Profile;
    isError: boolean;
    isLoading: boolean;
}

const useProfile = ({ id }: UseProfileProps): UseProfileReturn => {
    const { data, isError, isLoading } = useData<Profile>({
        key: [...profilesQueryKey, id?.toString()],
        getData: () => getProfile(id as number),
        enabled: !!id,
    });

    return { profile: data, isError, isLoading };
};

export default useProfile;
