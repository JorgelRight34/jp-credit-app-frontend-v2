import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";
import { CacheKey } from "@/models";

interface UseFormPageProps {
    cacheKey?: CacheKey,
    onDelete?: () => void;
}

export const useFormPage = ({ cacheKey, onDelete }: UseFormPageProps) => {
    const dataClient = useDataClient();

    const { mutateAsync } = useDataMutation({
        mutationFn: async () => await onDelete?.(),
        onSuccess: () => {
            if (!cacheKey || !onDelete) return;

            dataClient.invalidate({ key: cacheKey })
        },
    })
    return { onDelete: mutateAsync }
}