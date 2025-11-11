import { DateRange as R, RangeKeyDict } from "react-date-range";

export type DateItem = {
  selection: R;
};

export type DateRange = {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  range1?: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
  };
};

export type DateOption = {
  label: string;
  selection: {
    startDate: Date;
    endDate: Date;
  };
} | RangeKeyDict;
