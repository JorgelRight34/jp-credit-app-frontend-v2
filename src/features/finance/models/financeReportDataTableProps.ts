import { EntityDataTableProps } from "@/components";
import { FinanceQuery } from "./financeQuery";

export interface FinanceReportDataTableProps<T>
  extends EntityDataTableProps<T, FinanceQuery> {
  dateHeader: string;
  dateCell: (val: T) => Date | string;
}
