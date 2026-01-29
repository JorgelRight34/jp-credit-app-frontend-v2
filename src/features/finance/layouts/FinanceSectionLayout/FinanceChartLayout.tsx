import { TimeUnit } from "@/models";
import FinanceChart from "../../components/FinanceChart";
import { FinancialComponentType } from "../../models/financialComponentType";
import { financialComponentTypesConfig } from "../../lib/constants";
import { FinancialBreakdown } from "../../models/financialBreakdown";

type ChartProps = {
  start: string | Date;
  end: string | Date;
  items: FinancialBreakdown[];
};

interface FinanceChartLayoutProps<T extends ChartProps> {
  types: FinancialComponentType[];
  report: T;
  timeUnit: TimeUnit;
}

const FinanceChartLayout = <T extends ChartProps>({
  types,
  timeUnit,
  report,
}: FinanceChartLayoutProps<T>) => (
  <FinanceChart
    scaleType="band"
    timeUnit={timeUnit}
    minDate={new Date(report.start)}
    maxDate={new Date(report.end)}
    data={types.map((type) => ({
      label: financialComponentTypesConfig[type].label,
      color: financialComponentTypesConfig[type].color,
      data: report.items.map((el) => [el.date, el[type]]),
    }))}
  />
);

export default FinanceChartLayout;
