import { useDataMutation } from "@/hooks/useMutate"
import { bookmarkReport } from "../services/reportsClient"
import { useDataClient } from "@/hooks/useDataClient"
import { reportsCacheKey } from "../lib/constants";

export const useBookmarkReport = () => {
    const dataClient = useDataClient();

    const { mutateAsync, isPending, isError } = useDataMutation({
        mutationFn: ({ id, bookmark }: { id: number, bookmark: boolean }) => bookmarkReport(id, bookmark),
        onSuccess: () => dataClient.invalidateQueries({ queryKey: reportsCacheKey })
    })

    return { bookmark: mutateAsync, isPending, isError }
}