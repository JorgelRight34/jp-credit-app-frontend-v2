import { useData } from "@/hooks/useData"
import { reportsCacheKey } from "../lib/constants"
import { ReportKey } from "../models/reportKey"
import { getReports } from "../services/reportsClient"

interface UseBookmarkedReportsProps {
    key: ReportKey
}

export const useBookMarkedReports = ({ key }: UseBookmarkedReportsProps) => {
    const { data, isLoading, isError } = useData({
        key: [...reportsCacheKey, "bookmark", key],
        getData: () => getReports({ reportKey: key, bookmark: true })
    })

    return { reports: data, isLoading, isError }
}