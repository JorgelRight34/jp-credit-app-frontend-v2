import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

type PieChartData<TData = number[], TLabel = string> = ChartData<
  'pie',
  TData,
  TLabel
>
type PieChartOptions = ChartOptions<'pie'>

interface PieChartProps<TData = number[], TLabel = string> {
  data: PieChartData<TData, TLabel>
  options?: PieChartOptions
}

const PieChart = <TData, TLabel = string>({
  data,
  options,
}: PieChartProps<TData, TLabel>) => {
  return <Pie data={data} options={options} />
}

export default PieChart
