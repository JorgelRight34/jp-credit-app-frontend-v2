import { FinancialBreakdown } from '../models/financialBreakdown'
import { BarChart, ChartType, LineChart, PieChart } from '@/components'
import { toCurrency, toFormattedDate } from '@/lib/utils'

interface FinancialBreakdownChartProps {
  data: Array<FinancialBreakdown>
  type: ChartType
}

type SeriesKey = 'capital' | 'interest' | 'fee'

const SERIES_CONFIG: Record<
  SeriesKey,
  { label: string; bg: string; border: string }
> = {
  capital: {
    label: 'Capital',
    bg: 'rgba(54, 162, 235, 0.6)',
    border: 'rgba(54, 162, 235, 1)',
  },
  interest: {
    label: 'Interés',
    bg: 'rgba(255, 99, 132, 0.6)',
    border: 'rgba(255, 99, 132, 1)',
  },
  fee: {
    label: 'Mora',
    bg: 'rgba(255, 206, 86, 0.6)',
    border: 'rgba(255, 206, 86, 1)',
  },
}

const SERIES_KEYS = Object.keys(SERIES_CONFIG) as SeriesKey[]

const currencyYAxis = {
  y: {
    ticks: {
      callback: (value: number | string) => toCurrency(value as number),
    },
  },
}

const currencyTooltip = {
  callbacks: {
    label: (ctx: any) => {
      const total = ctx.dataset.data.reduce(
        (sum: number, v: unknown) => sum + (v as number),
        0,
      )
      const value = ctx.parsed as number
      const percentage = ((value / total) * 100).toFixed(1)
      return ` ${toCurrency(value)} (${percentage}%)`
    },
  },
}

const FinancialBreakdownChart = ({
  data,
  type,
}: FinancialBreakdownChartProps) => {
  const labels = data.map((d) => toFormattedDate(d.date)!)

  const multiDatasets = SERIES_KEYS.map((key) => ({
    label: SERIES_CONFIG[key].label,
    data: data.map((d) => d[key]),
    backgroundColor: SERIES_CONFIG[key].bg,
    borderColor: SERIES_CONFIG[key].border,
    borderWidth: 1,
  }))

  switch (type) {
    case 'bar':
      return (
        <BarChart
          data={{ labels, datasets: multiDatasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: currencyYAxis,
          }}
        />
      )

    case 'linear':
      return (
        <LineChart
          data={{
            labels,
            datasets: multiDatasets.map((ds) => ({
              ...ds,
              fill: false,
              tension: 0.3,
              pointRadius: 3,
            })),
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: currencyYAxis,
            plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: (ctx) =>
                    ` ${SERIES_CONFIG[SERIES_KEYS[ctx.datasetIndex]].label}: ${toCurrency(ctx.parsed.y!)}`,
                },
              },
            },
          }}
        />
      )

    case 'pie':
      return (
        <PieChart
          data={{
            labels: SERIES_KEYS.map((k) => SERIES_CONFIG[k].label),
            datasets: [
              {
                data: SERIES_KEYS.map((key) =>
                  data.reduce((sum, d) => sum + d[key], 0),
                ),
                backgroundColor: SERIES_KEYS.map((k) => SERIES_CONFIG[k].bg),
                borderColor: SERIES_KEYS.map((k) => SERIES_CONFIG[k].border),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
              tooltip: { callbacks: currencyTooltip.callbacks },
            },
          }}
        />
      )
  }
}

export default FinancialBreakdownChart
