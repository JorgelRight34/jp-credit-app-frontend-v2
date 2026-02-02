import React from 'react'
import TableBody from './table-body'
import TableRow from './table-row'
import TableDataCell from './table-data-cell'
import { range } from '@/lib/utils'
import { Skeleton } from '@/components/atoms'

interface TableBodySkeletonProps {
  pageSize: number
  columnsLength: number
}

const TableBodySkeleton = ({
  pageSize,
  columnsLength,
}: TableBodySkeletonProps) => {
  return (
    <TableBody>
      {range(pageSize).map((i) => (
        <React.Fragment key={i}>
          <TableRow>
            {range(columnsLength).map((j) => (
              <TableDataCell className="pr-5" key={j}>
                <Skeleton>&nbsp;</Skeleton>
              </TableDataCell>
            ))}
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  )
}

export default TableBodySkeleton
