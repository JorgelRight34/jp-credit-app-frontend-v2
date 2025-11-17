import { DateRange as R, RangeKeyDict } from "react-date-range";

export type DateItem = {
  selection: R;
};

export type DateOption = {
  label: string;
  selection: {
    startDate: Date;
    endDate: Date;
  };
} | RangeKeyDict;
