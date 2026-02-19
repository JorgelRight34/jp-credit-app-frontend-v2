import { Activity, HTMLAttributes, useState } from 'react'
import { ArrowDownwardIcon, ArrowUpwardIcon, Icon } from '../../icon'
import clsx from 'clsx'

const ViewMore = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [expanded, setExpanded] = useState<boolean | null>(null)

  return (
    <>
      {expanded !== true && (
        <ViewButtonContainer {...props}>
          <Icon
            className="cursor-pointer text-accent"
            icon={ArrowDownwardIcon}
            onClick={() => setExpanded((prev) => !prev)}
          >
            Ver más
          </Icon>
        </ViewButtonContainer>
      )}
      {expanded !== null && (
        <Activity mode={expanded === true ? 'visible' : 'hidden'}>
          {children}
        </Activity>
      )}
      {expanded === true && (
        <ViewButtonContainer {...props}>
          <Icon
            className="cursor-pointer text-accent"
            icon={ArrowUpwardIcon}
            onClick={() => setExpanded((prev) => !prev)}
          >
            Ver menos
          </Icon>
        </ViewButtonContainer>
      )}
    </>
  )
}

const ViewButtonContainer = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('flex justify-end pb-1 border-b', className)}>
      <span>{children}</span>
    </div>
  )
}

export default ViewMore
