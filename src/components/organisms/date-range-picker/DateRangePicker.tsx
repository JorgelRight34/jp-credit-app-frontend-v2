import useDateSearch from "./hooks/useDateSearch";
import YearSelect from "../EntityForm/inputs/YearSelect";
import MonthSelect from "../EntityForm/inputs/MonthSelect";
import { primaryColor } from "../../utils/constants";
import { es } from "date-fns/locale";
import { DateOption, DateRange as R } from "./models/dateInput";
import FormLabel from "../ui/FormLabel";
import { useDateRangeOptions } from "./hooks/useDateRangeOptions";
import { useEffect, useState } from "react";
import LightBtn from "../ui/LightBtn";
import DateRange from "./DateRange";
import clsx from "clsx";

export interface DateRangePickerProps {
  disabledDates?: Date[];
  defaultValue?: R;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (range: R) => void;
}

const DateRangePicker = ({
  defaultValue,
  disabledDates = [],
  minDate,
  maxDate,
  onChange,
}: DateRangePickerProps) => {
  const { handleOnDateRangeChange, dateRange } = useDateSearch({
    minDate,
    defaultValue,
    maxDate,
  });
  const { options, month, year, setMonth, setYear } = useDateRangeOptions({
    setDateRange: handleOnDateRangeChange,
  });
  const [isMonthAndYearDisabled, setIsMonthAndYearDisabled] = useState(false);

  const handleOnDateChange = (range: DateOption) => {
    handleOnDateRangeChange(range);
    setIsMonthAndYearDisabled(true);
  };

  useEffect(() => {
    if (dateRange) onChange?.(dateRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  useEffect(() => setIsMonthAndYearDisabled(false), [month, year]);

  return (
    <div className="flex">
      <div className="w-full md:w-3/12 pl-0 border-end">
        <div className="p-3">
          <span className="text-2xl">Opciones Rápidas</span>
          <div className="flex flex-col pt-3">
            {options.map((option, index) => (
              <LightBtn
                onClick={() => handleOnDateRangeChange(option)}
                key={index}
                className="mb-3"
              >
                {option.label as string}
              </LightBtn>
            ))}
          </div>
        </div>
        <div className="p-3">
          <span className="text-2xl">Manual</span>
          <div className="flex flex-col mb-3">
            <FormLabel>Año</FormLabel>
            <YearSelect
              value={year}
              className={clsx({ "bg-gray-100": isMonthAndYearDisabled })}
              onChange={(y) => setYear(Number(y))}
            />
          </div>
          <div className="flex flex-col mb-3">
            <FormLabel>Mes</FormLabel>
            <MonthSelect
              value={month}
              className={clsx({ "bg-gray-100": isMonthAndYearDisabled })}
              onChange={(m) => setMonth(Number(m))}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-9/12 pe-0">
        <DateRange
          className="w-full"
          editableDateInputs={true}
          onChange={handleOnDateChange}
          moveRangeOnFirstSelection={false}
          rangeColors={[primaryColor]}
          ranges={[dateRange]}
          maxDate={maxDate}
          minDate={minDate}
          disabledDates={disabledDates}
          locale={es}
          months={2}
          direction="horizontal"
        />
        {JSON.stringify(dateRange)}
      </div>
    </div>
  );
};

export default DateRangePicker;
