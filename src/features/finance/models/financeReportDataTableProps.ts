import { EntityDataTableProps } from "../../../components/DataTable/models/entityDataTableProps";

export interface FinanceReportDataTableProps<T>
  extends EntityDataTableProps<T> {
  dateHeader: string;
  dateCell: (val: T) => Date | string;
}
