import { Table } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import DataTableRow, { DataTableRowProps } from "./DataTableRow";
import { Row } from "../models/row";

interface DataTableBodyProps<T> extends Omit<DataTableRowProps<T>, "row"> {
  table: Table<T>;
  onExpand?: (row: Row<T>) => ReactNode;
}

const DataTableBody = <T,>({
  table,
  onExpand,
  ...props
}: DataTableBodyProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <DataTableRow row={row} {...props} />
          {onExpand && row.getIsExpanded() && (
            <tr className="border-top !bg-white">
              <td
                colSpan={
                  row.getVisibleCells().length + (row.getCanExpand() ? 1 : 0)
                }
                className="p-0 align-top"
              >
                <div className="block w-full">{onExpand(row)}</div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default DataTableBody;
