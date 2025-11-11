import { useCallback } from "react";
import { ReportFileType } from "../../Report/reportFileType";
import { ReportOptions } from "../../Report/reportOptions";

interface UseDownloadLoansProps {
  reportTitle?: string;
  triggerDownload?: boolean;
  onDownload?: (options: ReportOptions) => Promise<Blob>;
}

const useDownloadEntity = ({
  reportTitle = "",
  triggerDownload = false,
  onDownload
}: UseDownloadLoansProps) => {
  const handleTriggerDownload = (data: Blob, format: string) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(data);
    a.href = url;
    a.download = `reporte.${format}`;
    a.style.display = "none";
    document.body.appendChild(a);
    URL.revokeObjectURL(url);
    a.click();
  };

  const handleTriggerBrowserDownload = (data: Blob) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  };

  const download = useCallback(async (options: ReportOptions = {}) => {
    if (onDownload === undefined) throw Error("onDownload is undefined");

    return await onDownload(options)
  }, [onDownload])

  const handleDownload = useCallback(async (options: ReportOptions = {}) => {
    options.format = options.format ?? "pdf";

    const data = await download({ reportTitle, ...options });

    if (triggerDownload || options.format === ReportFileType.csv)
      handleTriggerDownload(data, options.format.toString());
    else if (options.format.toString() === ReportFileType.pdf.toString())
      handleTriggerBrowserDownload(data);
  },
    [download, reportTitle, triggerDownload]
  );
  return { download: handleDownload };
};

export default useDownloadEntity;
