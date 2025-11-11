import clsx from "clsx";
import { Row } from "../models/row";
import { flexRender } from "@tanstack/react-table";
import { Icon } from "@/components/ui";

export interface DataTableRowProps<TData> {
  row: Row<TData>;
  className?: string;
  canExpand?: boolean;
  onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void;
}

const DataTableRow = <TData,>({
  row,
  className,
  onRowClick,
}: DataTableRowProps<TData>) => {
  return (
    <tr
      key={row.id}
      className={clsx("bg-accent-hover cursor-pointer", className, {
        "bg-accent": row.getIsSelected(),
      })}
      onClick={(e) => onRowClick?.(row, e)}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
      {row.getCanExpand() && (
        <td>
          <Icon
            icon={row.getIsExpanded() ? "do_not_disturb_on" : "add_circle"}
            onClick={(event) => {
              event.stopPropagation();
              row.toggleExpanded();
            }}
          />
        </td>
      )}
    </tr>
  );
};

export default DataTableRow;
