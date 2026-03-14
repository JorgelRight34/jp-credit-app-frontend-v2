import { Icon, IconName } from '@/components'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

interface LoanStatusCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  isSelected: boolean
  icon: IconName
}

const LoanStatusCard = ({
  title,
  isSelected,
  className,
  children,
  icon,
  ...props
}: LoanStatusCardProps) => {
  return (
    <div
      className={clsx('bg-surface rounded-xl', className, {
        border: !isSelected,
        'border-accent-secondary': isSelected,
      })}
      {...props}
    >
      <div className="p-3 flex justify-start border-b">
        <Icon wrapperClassName="text-secondary" icon={icon}>
          {title}
        </Icon>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

export default LoanStatusCard
