import { Icon } from "@/components/ui";
import { flexRender, Table } from "@tanstack/react-table";
import clsx from "clsx";

interface DataTableHeadProps<T> {
  table: Table<T>;
  className?: string;
}

const DataTableHead = <T,>({ table, className }: DataTableHeadProps<T>) => {
  return (
    <thead className={clsx("border-bottom rounded-xl", className)}>
      {/* Get all header groups from table */}
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="cursor-pointer">
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              <div
                {...{
                  className: header.column.getCanSort()
                    ? "cursor-pointer hover flex items-center"
                    : "",
                  onClick: header.column.getToggleSortingHandler(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() && (
                  <Icon
                    className="ml-2"
                    icon={
                      header.column.getIsSorted() === "asc"
                        ? "arrow_upward"
                        : header.column.getIsSorted() === "desc"
                          ? "arrow_downward"
                          : ""
                    }
                  />
                )}
              </div>
            </th>
          ))}
          {table.getCanSomeRowsExpand() && <th>&nbsp;</th>}
        </tr>
      ))}
    </thead>
  );
};

export default DataTableHead;
