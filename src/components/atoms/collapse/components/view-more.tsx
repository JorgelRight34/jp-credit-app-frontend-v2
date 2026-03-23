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
            className="text-accent cursor-pointer"
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
        <ViewButtonContainer className="mt-3" {...props}>
          <Icon
            className="text-accent cursor-pointer"
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
    <div className={clsx('flex justify-end border-b pb-1', className)}>
      <span>{children}</span>
    </div>
  )
}

export default ViewMore
