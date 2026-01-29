import clsx from 'clsx'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Container, Icon } from '@/components/atoms'

interface FinancialCardProps {
  title?: string
  heading: string | number
  subheading: string
  headers: Array<Array<string | number>>
  orientation?: 'row' | 'col'
  className?: string
  headingClassName?: string
  icon?: IconName
}

const FinancialCard = ({
  title,
  heading,
  headers,
  orientation = 'col',
  subheading,
  headingClassName,
  icon,
  className,
}: FinancialCardProps) => {
  return (
    <Container className={className}>
      {/* Top title */}
      {title && (
        <header className="border-bottom p-3">
          <Icon icon={icon} label={title} labelClassName={'text-xl'} />
        </header>
      )}
      {/* Body */}
      <section
        className={clsx(`flex p-3`, { 'flex-col': orientation === 'col' })}
      >
        {/* First column */}
        <div
          className={clsx(`flex flex-col justify-center`, headingClassName, {
            'w-6/12': orientation === 'row',
            'mb-4': orientation === 'col',
          })}
        >
          <h6 className="truncate text-center">{subheading}</h6>
          {/* Big heading */}
          <span className="truncate text-center text-3xl">{heading}</span>
        </div>
        {/* Second column */}
        <div
          className={clsx('flex flex-col flex-wrap', {
            'w-6/12 gap-3': orientation === 'row',
            'gap-4': orientation === 'col',
          })}
        >
          {/* Headers */}
          {headers.map((header, key) => (
            <header key={key} className="border-bottom flex justify-between">
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
