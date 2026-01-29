import type { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";

interface UseFormPageProps {
    cacheKey?: CacheKey,
    onDelete?: () => void;
}

export const useFormPage = ({ cacheKey, onDelete }: UseFormPageProps) => {
    const dataClient = useDataClient();

    const { mutateAsync } = useDataMutation({
        mutationFn: async () => await onDelete?.(),
        onSuccess: () => {
            if (!cacheKey) return;
            dataClient.invalidate({ key: cacheKey })
        },
    })
    return { onDelete: mutateAsync }
}