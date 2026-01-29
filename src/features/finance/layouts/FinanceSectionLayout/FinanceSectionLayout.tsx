import clsx from "clsx";
import React from "react";
import FinancePrincipalLayout from "./FinancePrincipalLayout";
import FinanceSecondaryLayout from "./FinanceSecondaryLayout";
import FinanceChartLayout from "./FinanceChartLayout";

const FinanceSectionLayout = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx("flex flex-col md:flex-row", className)} {...props}>
      {children}
    </div>
  );
};

FinanceSectionLayout.Principal = FinancePrincipalLayout;
FinanceSectionLayout.Secondary = FinanceSecondaryLayout;
FinanceSectionLayout.Chart = FinanceChartLayout;

export default FinanceSectionLayout;
