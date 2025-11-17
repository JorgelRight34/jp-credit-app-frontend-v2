import { useCallback } from "react";
import {
  downloadArmotizationAs,
  downloadAs,
} from "../services/calculatorClient";

type UseDownloadArmotizationReturn = [
  (body: string) => Promise<void>,
  (id: number) => Promise<void>
];

/**
 * Custom hook to download armotization files.
 * @returns {Function} downloadCustomArmotization - Function to download custom armotization file.
 * @returns {Function} downloadLoanArmotization - Function to download loan armotization file.
 */
const useDownloadArmotization = (
  fileFormat = "csv"
): UseDownloadArmotizationReturn => {
  const downloadCustomArmotization = useCallback(async (body: string) => {
    const response = await downloadAs(fileFormat, body);
    downloadFile(response.data);
  }, []);

  const downloadLoanArmotization = useCallback(async (id: number) => {
    const response = await downloadArmotizationAs(fileFormat, id);
    downloadFile(response.data);
  }, []);

  const downloadFile = (file: Blob) => {
    const a = document.createElement("a");
    const fileUrl = URL.createObjectURL(file);
    a.href = fileUrl;
    a.download = `armotization.${fileFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileUrl);
  };

  return [downloadCustomArmotization, downloadLoanArmotization];
};

export default useDownloadArmotization;
