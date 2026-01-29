import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

export default function ScrollableChart() {
  // Generate 50 data points for demonstration
  const data = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const years = ["2020", "2021", "2022", "2023", "2024"];
    const labels = [];

    years.forEach((year) => {
      months.forEach((month) => {
        labels.push(`${month} ${year}`);
      });
    });

    return [
      {
        label: "Revenue",
        data: labels.map((label, i) => ({
          date: label,
          value: Math.random() * 4 + 4 + 1200, // Values between 4-8
        })),
      },
      {
        label: "Expenses",
        data: labels.map((label, i) => ({
          date: label,
          value: Math.random() * 3 + 2, // Values between 2-5
        })),
      },
    ];
  }, []);

  const primaryAxis = useMemo(
    (): AxisOptions<(typeof data)[0]["data"][0]> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<(typeof data)[0]["data"][0]>[] => [
      {
        getValue: (datum) => datum.value + +1200,
        elementType: "line",
        min: 0,
        max: 10,
        hardMin: 0,
        hardMax: 10,
      },
    ],
    []
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Monthly Performance Dashboard
        </h1>
        <p className="text-slate-300 mb-6">
          Scroll horizontally to view all data points across 5 years
        </p>

        <div className="bg-white rounded-lg shadow-2xl p-6">
          <div className="overflow-x-auto overflow-y-hidden">
            <div style={{ width: "3000px", height: "500px" }}>
              <Chart
                options={{
                  data,
                  primaryAxis,
                  secondaryAxes,
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-slate-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-slate-600">Expenses</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">
              💡 <strong>Tip:</strong> Use your mouse or trackpad to scroll
              horizontally through the chart and explore all 60 data points
              spanning from 2020 to 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
