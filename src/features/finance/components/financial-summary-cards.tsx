import { Fieldset } from '@/components'
import { toCurrency } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface FinancialSummaryCardsProps {
  capital: number
  interest: number
  fee: number
  className?: string
}

const FinancialSummaryCards = ({
  capital,
  interest,
  fee,
  className = 'flex-col',
}: FinancialSummaryCardsProps) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      <FinancialSummaryCard title="Capital" value={capital} />
      <FinancialSummaryCard title="Interés" value={interest} />
      <FinancialSummaryCard title="Mora" value={fee} />
    </div>
  )
}

const FinancialSummaryCard = ({
  title,
  value,
}: {
  title: string
  value: number
}) => {
  return (
    <Fieldset
      className="shadow-sm"
      legend={title}
      legendClassName="text-center"
    >
      <section className="flex h-full flex-1 flex-col p-3 px-6">
        <div className="flex flex-col justify-center py-2">
          <span className="text-accent truncate text-center text-4xl">
            {toCurrency(value)}
          </span>
        </div>
      </section>
    </Fieldset>
  )
}

export const FinancialSummaryCardsLayout = ({
  children,
}: PropsWithChildren) => {
  return <section className="flex">{children}</section>
}

FinancialSummaryCardsLayout.Main = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-9/12">
      <section>{children}</section>
    </div>
  )
}

FinancialSummaryCardsLayout.Aside = ({ children }: PropsWithChildren) => {
  return <div className="w-3/12 px-3">{children}</div>
}

export default FinancialSummaryCards
