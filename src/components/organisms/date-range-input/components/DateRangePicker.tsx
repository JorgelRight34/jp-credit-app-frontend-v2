"use client";

import DateRange from "./DateRange";
import clsx from "clsx";
import { DateRange as R } from "../models/dateRange";
import { useDateSearch } from "../hooks/useDateSearch";
import { useDateRangeOptions } from "../hooks/useDateRangeOptions";
import { useState } from "react";
import { DateOption } from "../models/dateInput";
import {
  FormLabel,
  LightBtn,
  MonthSelect,
  YearSelect,
} from "@/components/atoms";
import { primaryColor } from "@/utils/constants";
import { es } from "date-fns/locale";

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
    onChange,
  });
  const { options, month, year, setMonth, setYear } = useDateRangeOptions({
    setDateRange: handleOnDateRangeChange,
  });
  const [isMonthAndYearDisabled, setIsMonthAndYearDisabled] = useState(false);

  const handleOnDateChange = (range: DateOption) => {
    handleOnDateRangeChange(range);
    setIsMonthAndYearDisabled(true);
  };

  return (
    <div className="flex">
      <div className="border-end w-full pl-0 md:w-3/12">
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
          <div className="mb-3 flex flex-col">
            <FormLabel>Año</FormLabel>
            <YearSelect
              value={year}
              className={clsx({ "bg-gray-100": isMonthAndYearDisabled })}
              onChange={(y) => {
                setYear(+y);
                setIsMonthAndYearDisabled(true);
              }}
            />
          </div>
          <div className="mb-3 flex flex-col">
            <FormLabel>Mes</FormLabel>
            <MonthSelect
              value={month}
              className={clsx({ "bg-gray-100": isMonthAndYearDisabled })}
              onChange={(m) => {
                setMonth(+m);
                setIsMonthAndYearDisabled(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col pe-0 md:w-9/12">
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
      </div>
    </div>
  );
};

export default DateRangePicker;
