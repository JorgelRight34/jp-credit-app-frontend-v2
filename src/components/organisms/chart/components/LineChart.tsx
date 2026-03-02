import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
)

type LineChartData<TData = number[], TLabel = string> = ChartData<
  'line',
  TData,
  TLabel
>

type LineChartOptions = ChartOptions<'line'>

interface LineChartProps<TData = number[], TLabel = string> {
  data: LineChartData<TData, TLabel>
  options?: LineChartOptions
}

const LineChart = <TData, TLabel = string>({
  data,
  options,
}: LineChartProps<TData, TLabel>) => {
  return <Line data={data} options={options} />
}

export default LineChart
