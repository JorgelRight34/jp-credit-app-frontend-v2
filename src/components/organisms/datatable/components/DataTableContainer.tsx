import { Table } from "@/components/atoms";
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
      <div className="flex w-full flex-col overflow-x-auto">
        <Table className={className}>
          {head}
          {table}
          {footer}
        </Table>
      </div>
      <div className="border-top flex-shrink-0">{navigation}</div>
    </div>
  );
};

export default DataTableContainer;
