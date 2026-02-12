import clsx from 'clsx'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Container, Icon } from '@/components/atoms'

interface FinancialCardProps {
  title?: string
  heading: string | number
  subheading: string
  headers: Array<Array<string | number>>
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
  icon,
  className,
}: FinancialCardProps) => {
  return (
    <Container className={className}>
      {/* Top title */}
      <header className="flex-shrink-0 border-b p-3">
        <Icon icon={icon} label={title} labelClassName="text-xl" />
      </header>
      <section className="flex flex-1 flex-col p-3">
        <div
          className={clsx(
            `flex flex-col justify-center mb-4`,
            headingClassName,
          )}
        >
          <h6 className="truncate text-center">{subheading}</h6>
          <span className="truncate text-center text-accent text-4xl">
            {heading}
          </span>
        </div>
        <div className="flex flex-1 min-h-0 flex-col flex-wrap gap-4 items-between !justify-between">
          {headers.map((header, key) => (
            <header key={key} className="border-b flex justify-between">
              <span>{header[0]}</span>
              <b className="truncate">{header[1]}</b>
            </header>
          ))}
        </div>
      </section>
    </Container>
  )
}

export default FinancialCard
