import React, { useMemo } from 'react'
import clsx from 'clsx'
import Table from './table'
import TableBody from './table-body'
import TableRow from './table-row'
import TableDataCell from './table-data-cell'
import type { ReactNode } from 'react'

interface KeyValueTableProps {
  data: Array<Array<ReactNode>>
  footerRows?: Array<Array<ReactNode>>
  className?: string
}

/**
 * KeyValueTable component displays a table with alternating header and data cells.
 */
const KeyValueTable = ({
  data,
  footerRows = [],
  className = '',
}: KeyValueTableProps) => {
  const longestRow = useMemo(
    () =>
      data.reduce(
        (acc, curr) => (acc.length > curr.length ? acc : curr),
        data[0],
      ),
    [data],
  )

  return (
    <div className={clsx(`rounded-3 w-full border px-0 shadow-sm`, className)}>
      <Table>
        <TableBody>
          {data.map((row, i) => {
            const paddedRow = [
              ...row,
              ...Array(longestRow.length - row.length).fill(null),
            ]

            return (
              <TableRow key={i}>
                {paddedRow
                  .fill(null, row.length, longestRow.length)
                  .map((col, key) => (
                    <React.Fragment key={key}>
                      {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}{' '}
                    </React.Fragment>
                  ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {footerRows.length > 0 && (
        <Table>
          <TableBody>
            {footerRows.map((row, i) => (
              <TableDataCell key={i}>
                {row.map((col, key) => (
                  <React.Fragment key={key}>
                    {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}
                  </React.Fragment>
                ))}
              </TableDataCell>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default KeyValueTable
