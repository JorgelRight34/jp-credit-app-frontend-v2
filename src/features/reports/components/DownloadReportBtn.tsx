import { useState } from "react";
import Modal from "../Modal/Modal";
import DownloadReportForm from "./DownloadReportForm";
import { ReportFileType } from "./reportFileType";
import { ReportOptions } from "./reportOptions";
import LightBtn from "../ui/LightBtn";
import { ButtonProps } from "../ui/Button";

export interface DownloadReportBtnProps extends ButtonProps {
  title: string;
  className?: string;
  onDownload: (format: ReportFileType, options?: ReportOptions) => void;
  reportOptions?: ReportOptions;
}

const DownloadReportBtn = ({
  title,
  className = "",
  reportOptions = {},
  onDownload,
  ...props
}: DownloadReportBtnProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <LightBtn
        className={className}
        type="button"
        icon="download"
        onClick={() => setShowModal(true)}
        disabled={!!onDownload}
        {...props}
      />

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        width="50dvw"
        title={`Exportar ${title}`}
      >
        <DownloadReportForm
          reportOptions={reportOptions}
          onDownload={onDownload}
        />
      </Modal>
    </>
  );
};

export default DownloadReportBtn;
