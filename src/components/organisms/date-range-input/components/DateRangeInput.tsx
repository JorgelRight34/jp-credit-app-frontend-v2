import { useMemo, useState } from "react";
import { toDateRange } from "../utils/utils";
import DateRangePicker, { DateRangePickerProps } from "./DateRangePicker";
import { Input, InputProps } from "@/components/atoms";
import { DateRange } from "../models/dateRange";
import Modal from "../../modal/components/Modal";

type DateRangeInputProps = Omit<
  DateRangePickerProps,
  "defaultStartDate" | "defaultEndDate" | "defaultValue"
> &
  InputProps & {
    label?: string;
    defaultValue?: [Date, Date] | unknown;
  };

const DateRangeInput = ({
  label,
  defaultValue,
  value,
  onChange,
  ...props
}: DateRangeInputProps) => {
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(
    toDateRange(defaultValue) ?? toDateRange(value as Date[]),
  );

  const dateLabels = useMemo(
    () => ({
      start: dateRange?.startDate?.toLocaleDateString() ?? "dd/mm/yyyy",
      end: dateRange?.endDate?.toLocaleDateString() ?? "dd/mm/yyyy",
    }),
    [dateRange],
  );

  return (
    <>
      <Input
        {...props}
        label={label}
        value={`${dateLabels.start} - ${dateLabels.end}`}
        id="date-range"
        type="text"
        icon={{ icon: "calendar_month" }}
        onClick={() => setShowModal((prev) => !prev)}
        readOnly
      />
      <Modal
        width="80dvw"
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Rango"
      >
        <DateRangePicker
          defaultValue={dateRange ?? undefined}
          onChange={(range) => {
            setDateRange(range);
            onChange?.(range);
          }}
          {...props}
        />
      </Modal>
    </>
  );
};

export default DateRangeInput;
