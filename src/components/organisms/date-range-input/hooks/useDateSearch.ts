import { useCallback, useMemo, useState } from "react";
import { DateRange, DateRange as R } from "../models/dateRange";
import { DateOption } from "../models/dateInput";
import { RangeKeyDict } from "react-date-range";
import { normalizeDate } from "@/utils/utils";

interface UseDateSearchProps {
  defaultValue?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (range: R) => void;
}

const today = new Date();

export const useDateSearch = ({ defaultValue, minDate, maxDate, onChange }: UseDateSearchProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    {
      startDate: defaultValue?.startDate ?? today,
      endDate: defaultValue?.endDate ?? today,
    },
  );
  const { normalizedMinDate, normalizedMaxDate } = useMemo(() => (
    {
      normalizedMinDate: minDate ? normalizeDate(minDate) : undefined,
      normalizedMaxDate: maxDate ? normalizeDate(maxDate) : undefined,
    })
    , [minDate, maxDate]);

  const isDateValid = useCallback((date: Date) => {
    const normalized = normalizeDate(date);
    return !(
      (normalizedMinDate && normalized < normalizedMinDate) ||
      (normalizedMaxDate && normalized > normalizedMaxDate)
    );
  }, [normalizedMaxDate, normalizedMinDate])

  const handleOnDateRangeChange = useCallback((item: DateOption | RangeKeyDict) => {
    const selection = item.selection ?? item["range1" as keyof typeof item];
    const { startDate, endDate } = selection;

    if (startDate && !isDateValid(startDate) && minDate) {
      selection.startDate = minDate;
    }

    if (endDate && !isDateValid(endDate)) return;

    setDateRange(selection);
    onChange?.(selection)
  }, [isDateValid, minDate, onChange]);

  return {
    dateRange,
    handleOnDateRangeChange,
  };
};
