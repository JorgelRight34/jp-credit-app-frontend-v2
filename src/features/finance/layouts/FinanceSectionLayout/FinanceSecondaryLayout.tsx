import { ReactNode } from "react";
import { FinanceReport } from "../../models/financeReport";

interface FinanceSecondaryLayoutProps<T = FinanceReport> {
  render: (report: T, lastReport?: T) => ReactNode;
  report?: T;
  lastReport?: T;
}

const FinanceSecondaryLayout = <T,>({
  render,
  report,
  lastReport,
}: FinanceSecondaryLayoutProps<T>) => (
  <div className="order-1 mb-6 w-full space-y-3 pl-2 md:order-none md:mb-0 md:w-3/12">
    {report && render(report, lastReport)}
  </div>
);

export default FinanceSecondaryLayout;
