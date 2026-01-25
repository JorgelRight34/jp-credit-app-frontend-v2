import clsx from "clsx";
import { TableHTMLAttributes } from "react";
import "../styles/dataTable.css";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      className={clsx("border-collapse overflow-x-auto", className)}
      style={{ width: "max-content", minWidth: "100%" }}
      {...props}
    >
      {children}
    </table>
  );
};

export default Table;
