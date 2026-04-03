import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title)

type BarChartData<TData = number[], TLabel = string> = ChartData<
  'bar',
  TData,
  TLabel
>
type BarChartOptions = ChartOptions<'bar'>

interface BarChartProps<TData = number[], TLabel = string> {
  data: BarChartData<TData, TLabel>
  options?: BarChartOptions
}

const BarChart = <TData, TLabel = string>({
  data,
  options,
}: BarChartProps<TData, TLabel>) => {
  return (
    <>
      <BarLegend data={data} />
      <div className="h-full overflow-x-auto overflow-y-auto">
        <div
          className="h-full"
          style={{
            minWidth: `${(data.labels?.length ?? 1) * 80}px`,
          }}
        >
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  )
}

const BarLegend = <TData, TLabel = string>({
  data,
}: BarChartProps<TData, TLabel>) => {
  return (
    <div className="flex w-full justify-center gap-6 py-2">
      {data.datasets.map((ds, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: Array.isArray(ds.backgroundColor)
                ? ds.backgroundColor[0]
                : ds.backgroundColor,
              border: `1px solid ${
                Array.isArray(ds.borderColor)
                  ? ds.borderColor[0]
                  : ds.borderColor
              }`,
            }}
          />
          <span className="text-sm">{ds.label}</span>
        </div>
      ))}
    </div>
  )
}

export default BarChart
