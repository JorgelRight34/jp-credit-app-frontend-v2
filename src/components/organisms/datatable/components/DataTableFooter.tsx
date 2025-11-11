import { flexRender, Table } from "@tanstack/react-table";
import clsx from "clsx";

interface DataTableFooterProps<T> {
  table: Table<T>;
  className?: string;
}

const DataTableFooter = <T,>({ table, className }: DataTableFooterProps<T>) => {
  return (
    <>
      {table
        .getFooterGroups()
        .some((group) =>
          group.headers.some((header) => header.column.columnDef.footer),
        ) && (
        <tfoot className={clsx("border-top", className)}>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </>
  );
};

export default DataTableFooter;
