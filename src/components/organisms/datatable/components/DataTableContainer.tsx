import clsx from "clsx";
import { ReactNode } from "react";

type DataTableContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  head?: ReactNode;
  table: ReactNode;
  footer?: ReactNode;
  navigation?: ReactNode;
};

const DataTableContainer = ({
  table,
  footer,
  head,
  navigation,
  className,
  ...props
}: DataTableContainerProps) => {
  return (
    <div
      className="flex h-full flex-col rounded-xl border shadow-sm"
      {...props}
    >
      <div className="table-wrapper flex w-full flex-col overflow-x-auto">
        <table
          className={clsx(className)}
          style={{ width: "max-content", minWidth: "100%" }}
        >
          {head}
          {table}
          {footer}
        </table>
      </div>
      <div className="border-top flex-shrink-0">{navigation}</div>
    </div>
  );
};

export default DataTableContainer;
