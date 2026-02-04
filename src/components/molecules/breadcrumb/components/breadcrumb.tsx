import { Breadcrumbs } from '@mui/material'
import Crumb from './crumb'
import type { BreadcrumbSpec } from '../models/breadcrumb'

type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  breadcrumbs?: Array<BreadcrumbSpec>
  maxItems?: number
}

const Breadcrumb = ({
  breadcrumbs,
  maxItems = 4,
  ...props
}: BreadcrumbProps) => {
  return (
    <div role="presentation" {...props}>
      <Breadcrumbs
        className="opacity-70"
        aria-label="breadcrumb"
        maxItems={maxItems}
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
