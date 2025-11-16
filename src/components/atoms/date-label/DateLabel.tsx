import { nullFieldLabel } from "@/utils/constants";
import { getFullDateString, toFormattedDate } from "@/utils/utils";

interface DataLabelProps {
  date?: string | Date;
}

const DateLabel = ({ date }: DataLabelProps) => {
  const title = getFullDateString(date);

  return (
    <span className="cursor-pointer" title={title} data-title={title}>
      {date ? toFormattedDate(date) : nullFieldLabel}
    </span>
  );
};

export default DateLabel;
