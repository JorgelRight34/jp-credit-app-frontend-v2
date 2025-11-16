import clsx from "clsx";
import { ReportFileType } from "./reportFileType";
import CsvIcon from "../FileUpload/icons/CsvIcon";
import PdfIcon from "../FileUpload/icons/PdfIcon";
import WordIcon from "../FileUpload/icons/WordIcon";
import { useState } from "react";
import SelectInput from "../EntityForm/inputs/SelectInput";

const options = [
  {
    value: ReportFileType.pdf,
    title: "Documento PDF",
    subtitle: "Formato de documento portátil (.pdf)",
    icon: <PdfIcon className="w-10 h-7" />,
  },
  {
    value: ReportFileType.csv,
    title: "Documento CSV",
    subtitle: "Valores separados por comas (.csv)",
    icon: <CsvIcon className="w-10 h-7" />,
  },
  {
    value: ReportFileType.docx,
    title: "Documento Word",
    subtitle: "Documento de Microsoft Word (.docx)",
    icon: <WordIcon className="w-10 h-7" />,
  },
];

interface FileTypesSelectProps {
  className?: string;
  onChange: (val: ReportFileType) => void;
}

const FileTypesSelect = ({
  onChange,
  className = "",
}: FileTypesSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<ReportFileType>(
    ReportFileType.pdf
  );

  const handleSelect = (value: ReportFileType) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className={clsx(`relative w-full`, className)}>
      <SelectInput
        value={selectedOption}
        options={options.map((o) => [o.value, o.title])}
        onChange={(val) => handleSelect(val as ReportFileType)}
      />
    </div>
  );
};
export default FileTypesSelect;
