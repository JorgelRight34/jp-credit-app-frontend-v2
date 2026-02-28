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
  return <Bar data={data} options={options} />
}

export default BarChart
