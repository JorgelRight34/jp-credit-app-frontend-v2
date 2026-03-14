import clsx from 'clsx'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import { DetailRow, DetailRowGroup, Fieldset } from '@/components/atoms'
import { ReactNode } from 'react'

interface FinancialCardProps {
  title: string
  heading: ReactNode
  subheading?: string
  headers: Array<Array<ReactNode>>
  className?: string
  headingClassName?: string
  icon?: IconName
}

const FinancialCard = ({
  title,
  heading,
  headers,
  subheading,
  headingClassName,
  className,
}: FinancialCardProps) => {
  return (
    <Fieldset
      className={className}
      legend={title}
      legendClassName="text-center"
    >
      <section className="flex flex-1 h-full flex-col p-3 px-6">
        <div
          className={clsx(
            `flex flex-col justify-center py-2`,
            headingClassName,
          )}
        >
          {subheading && (
            <h6 className="truncate text-primary text-center">{subheading}</h6>
          )}
          <span className="truncate text-center text-accent text-4xl">
            {heading}
          </span>
        </div>
        <DetailRowGroup>
          {headers.map((header, key) => (
            <DetailRow key={key} title={header[0]} subtitle={header[1]} />
          ))}
        </DetailRowGroup>
      </section>
    </Fieldset>
  )
}

export default FinancialCard
