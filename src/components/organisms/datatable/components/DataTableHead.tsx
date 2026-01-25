import { Icon, TableHead, TableHeader, TableRow } from "@/components/atoms";
import { flexRender, Table } from "@tanstack/react-table";
interface DataTableHeadProps<T> {
  table: Table<T>;
  className?: string;
}

const DataTableHead = <T,>({ table, className }: DataTableHeadProps<T>) => {
  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="cursor-pointer">
          {headerGroup.headers.map((header) => (
            <TableHead className="px-4 py-2 whitespace-normal" key={header.id}>
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
            </TableHead>
          ))}
          {table.getCanSomeRowsExpand() && <th>&nbsp;</th>}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHead;
