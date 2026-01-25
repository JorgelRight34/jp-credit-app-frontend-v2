import { TdHTMLAttributes } from "react";
import "../styles/dataTable.css";
import clsx from "clsx";

type TableDataProps = TdHTMLAttributes<HTMLTableCellElement>;

const TableData = ({ children, className, ...props }: TableDataProps) => {
  return (
    <td
      className={clsx("px-4 py-1.5 py-2 text-sm whitespace-normal", className)}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableData;
