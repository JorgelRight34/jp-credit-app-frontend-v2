import { TableData, TableFooter, TableRow } from "@/components/atoms";
import { PageSize } from "../models/pageSize";
import DataTableBody from "./DataTableBody";
import DataTableFooter from "./DataTableFooter";
import DataTableNavigation from "./DataTableNavigation";
import { DataTableRenderProps } from "./DataTableStateWrapper";

const DataTableGroupTable = <T,>({ table }: DataTableRenderProps<T>) => {
  return (
    <>
      <DataTableBody table={table} />
      <DataTableFooter className="[display:table-header-group]" table={table} />
      <TableFooter className="!m-0 [display:table-header-group] border-none !p-0">
        <TableRow className="!m-0 border-none !p-0">
          <TableData
            colSpan={table.getVisibleFlatColumns().length}
            className="!m-0 border-none !p-0 align-top"
          >
            <div className="w-full">
              <DataTableNavigation
                table={table}
                className="w-full"
                pageSize={table.getState().pagination.pageSize as PageSize}
                totalItems={table.options.data.length}
              />
            </div>
          </TableData>
        </TableRow>
      </TableFooter>
    </>
  );
};

export default DataTableGroupTable;
