import { Breadcrumbs } from '@mui/material'
import Crumb from './crumb'
import type { BreadcrumbSpec } from '../models/breadcrumb'

type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  breadcrumbs?: Array<BreadcrumbSpec>
  maxItems?: number
}

const SX = {
  '& .MuiBreadcrumbs-separator': {
    color: 'var(--text-muted)',
  },
  '& .MuiBreadcrumbs-ol': {
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
  },
}

const Breadcrumb = ({
  breadcrumbs,
  maxItems = 4,
  ...props
}: BreadcrumbProps) => {
  return (
    <div role="presentation" {...props}>
      <Breadcrumbs
        className="overflow-x-auto"
        aria-label="breadcrumb"
        maxItems={maxItems}
        sx={SX}
        {...props}
      >
        {breadcrumbs?.map((bread, index) => {
          return (
            <Crumb
              key={index}
              breadcrumb={bread}
              isLast={index === breadcrumbs.length - 1}
            />
          )
        })}
      </Breadcrumbs>
    </div>
  )
}

Breadcrumb.Crumb = Crumb

export default Breadcrumb
