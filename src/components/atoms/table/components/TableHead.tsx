import { ThHTMLAttributes } from "react";
import clsx from "clsx";
import "../styles/dataTable.css";

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <th className={clsx(className)} {...props}>
      {children}
    </th>
  );
};

export default TableHead;
