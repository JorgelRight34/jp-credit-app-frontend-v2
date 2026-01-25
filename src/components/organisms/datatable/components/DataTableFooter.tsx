import { TableFooter, TableHead, TableRow } from "@/components/atoms";
import { flexRender, Table } from "@tanstack/react-table";
import clsx from "clsx";

interface DataTableFooterProps<T> {
  table: Table<T>;
  className?: string;
}

const DataTableFooter = <T,>({ table, className }: DataTableFooterProps<T>) => {
  return (
    table
      .getFooterGroups()
      .some((group) =>
        group.headers.some((header) => header.column.columnDef.footer),
      ) && (
      <TableFooter className={clsx("border-top", className)}>
        {table.getFooterGroups().map((footerGroup) => (
          <TableRow key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    )
  );
};

export default DataTableFooter;
