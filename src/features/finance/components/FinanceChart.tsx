import EmptyMessage from "@/components/DataTable/components/EmptyMessage";
import { formatLargeNumber } from "@/utils/utils";
import React, { useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";
import { TimeUnit } from "@/models";
import { getDateGroupingLabel } from "../lib/lib";
/**
 * Defines a data point for the chart, where the first element is a string (e.g., date/category)
 * and the second element is a number (e.g., financial value)
 */
type DataPoint = [Date | string, number];

/**
 * Props for the FinanceChart component.
 * @typedef {object} FinanceChartProps
 * @property {UserSerie<DataPoint>[]} data - The chart data, an array of series. Each series is an object with 'label' and 'data'.
 * @property {boolean} [toFixed=true] - If true, the secondary axis (value) will display numbers with 2 decimal places (e.g., for currency).
 * @property {string} [scaleType="band"] - The scale type for the primary (x) axis. Defaults to 'band'. Inherited from AxisOptions.
 * @property {boolean} [showGrid] - Whether to show grid lines on the primary (x) axis. Inherited from AxisOptions.
 * @property {...React.HTMLAttributes<HTMLDivElement>} [props] - Standard HTML div attributes for the container div.
 */
type FinanceChartProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<AxisOptions<DataPoint>, "scaleType" | "showGrid" | "tickCount"> & {
    data: UserSerie<DataPoint>[];
    scaleType?: "band";
    toFixed?: boolean;
    minDate: Date;
    maxDate: Date;
    timeUnit: TimeUnit;
  };

const FinanceChart = ({
  data,
  scaleType = "band",
  showGrid,
  minDate,
  timeUnit,
  maxDate,
  toFixed = true,
}: FinanceChartProps) => {
  const stableData = useMemo<UserSerie<DataPoint>[]>(() => [...data], [data]);
  const hasData = useMemo(() => {
    return data.some((series) => series.data && series.data.length > 0);
  }, [data]);

  const primaryAxis = useMemo<AxisOptions<DataPoint>>(
    () => ({
      getValue: (datum) => datum[0],
      scaleType,
      formatters: {
        scale: (value: unknown) => {
          return getDateGroupingLabel(new Date(value as string), timeUnit, {
            minDate,
            maxDate,
          });
        },
        tooltip: (value: unknown) => {
          return String(value);
        },
      },
      showGrid,
    }),
    [maxDate, minDate, scaleType, showGrid, timeUnit],
  );

  const secondaryAxes = useMemo<AxisOptions<DataPoint>[]>(
    () => [
      {
        getValue: (datum) => datum[1],
        elementType: "line",
        formatters: {
          scale: (value: unknown) =>
            `$${
              typeof value === "number"
                ? formatLargeNumber(value, toFixed)
                : value
            }`,
          tooltip: (value: unknown) =>
            `$${
              typeof value === "number" && toFixed
                ? formatLargeNumber(value, toFixed)
                : value
            }`,
        },
        ticks: 1,
      },
    ],
    [toFixed],
  );

  const xCount = Math.max(...stableData.map((s) => s.data.length ?? 0), 0);
  const minWidth = Math.max(xCount * 80, 600);

  if (!hasData) {
    return <EmptyMessage title="Transacciones" />;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden px-1">
      <div style={{ minWidth: `${minWidth}px`, height: "500px" }}>
        <Chart
          options={{
            data: stableData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
};

export default FinanceChart;
