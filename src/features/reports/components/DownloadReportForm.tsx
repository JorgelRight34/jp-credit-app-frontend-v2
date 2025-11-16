import AccentBtn from "../ui/AccentBtn";
import FileTypesSelect from "./FileTypesSelect";
import { useState } from "react";
import { ReportFileType } from "./reportFileType";
import { ReportOptions } from "./reportOptions";
import { FormLabel } from "../ui";
import Input from "../EntityForm/inputs/Input";

interface DownloadReportBtnProps {
  onDownload: (format: ReportFileType, options?: ReportOptions) => void;
  reportOptions?: ReportOptions;
}

const DownloadReportForm = ({
  onDownload,
  reportOptions = {},
}: DownloadReportBtnProps) => {
  const [fileType, setFileType] = useState<ReportFileType | undefined>();
  const [formData, setFormData] = useState<ReportOptions>({
    initialPage: reportOptions.initialPage || 1,
    endPage: reportOptions.initialPage ? reportOptions.initialPage + 1 : 2,
  });

  const handleOnDownload = () => {
    onDownload(fileType || ReportFileType.pdf, formData);
  };

  const handleOnChange = (value: string, name: keyof ReportOptions) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1">
        <div className="mb-3">
          <FormLabel htmlFor="fileType">Tipo de Archivo</FormLabel>
          <FileTypesSelect className="h-10" onChange={setFileType} />
        </div>
        <div className="flex flex-col mb-3">
          <FormLabel htmlFor="initialPage">Pagina Inicial</FormLabel>
          <Input
            name="initialPage"
            id="initialPage"
            onChange={(val) => handleOnChange(val, "initialPage")}
            value={formData.initialPage}
            placeholder="1"
            type="number"
          />
        </div>
        <div className="flex flex-col mb-5">
          <FormLabel htmlFor="endPage">Pagina Final</FormLabel>
          <Input
            placeholder="10"
            name="endPage"
            id="endPage"
            value={formData.endPage}
            onChange={(val) => handleOnChange(val, "endPage")}
            type="number"
          />
        </div>
      </div>
      <div className="flex-shrink-0">
        <AccentBtn
          className="w-full"
          icon={"download"}
          onClick={handleOnDownload}
        >
          Descargar
        </AccentBtn>
      </div>
    </div>
  );
};

export default DownloadReportForm;
