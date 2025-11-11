import { useData } from "@/hooks/useData";
import { reportsCacheKey } from "../lib/constants";
import { getReport } from "../services/reportsClient";

interface UseReportProps {
    id?: number | string;
}

export const useReport = ({ id }: UseReportProps) => {
    const { data, isLoading, isError } = useData({
        key: [...reportsCacheKey, id?.toString()],
        getData: () => getReport(id as number),
        enabled: !!id
    })

    return { report: data, isLoading, isError }
}