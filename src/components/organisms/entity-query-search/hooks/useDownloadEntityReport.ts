import { ReportFileType, ReportOptions } from "@/features/reports";
import { handleTriggerBrowserDownload, triggerDownload } from "@/utils/utils";
import { useCallback } from "react";

interface UseDownloadEntityReportProps {
  reportTitle?: string;
  shouldDownload?: boolean;
  onDownload?: (options: ReportOptions) => Promise<Blob>;
}

export const useDownloadEntityReport = ({
  reportTitle = "",
  shouldDownload = false,
  onDownload
}: UseDownloadEntityReportProps) => {

  const download = useCallback(async (options: ReportOptions = {}) => {
    if (onDownload === undefined) throw Error("onDownload is undefined");

    return await onDownload(options)
  }, [onDownload])

  const handleDownload = useCallback(async (options: ReportOptions = {}) => {
    options.format = options.format ?? "pdf";

    const data = await download({ reportTitle, ...options });

    if (shouldDownload || options.format === ReportFileType.csv)
      triggerDownload(data, options.format.toString());
    else if (options.format.toString() === ReportFileType.pdf.toString())
      handleTriggerBrowserDownload(data);
  },
    [download, reportTitle, shouldDownload]
  );
  return { download: handleDownload };
};
