import React, { ReactNode, useMemo } from "react";
import clsx from "clsx";
import "./dataTable.css";
import { Table, TableBody, TableData, TableRow } from "@/components/atoms";

interface InfoTableProps {
  data: ReactNode[][];
  footerRows?: ReactNode[][];
  className?: string;
}

/**
 * InfoTable component displays a table with alternating header and data cells.
 * @param {InfoTableProps} props - Props containing the data to be displayed in the table.
 * @returns {JSX.Element} - A JSX element representing the InfoTable.
 */
const InfoTable = ({
  data,
  footerRows = [],
  className = "",
}: InfoTableProps) => {
  const longestRow = useMemo(
    () =>
      data.reduce(
        (acc, curr) => (acc.length > curr.length ? acc : curr),
        data[0],
      ),
    [data],
  );

  return (
    <div className={clsx(`rounded-3 w-full border px-0 shadow-sm`, className)}>
      <Table>
        <TableBody>
          {data.map((row, i) => {
            const paddedRow = [
              ...row,
              ...Array(longestRow.length - row.length).fill(null),
            ];

            return (
              <TableRow key={i}>
                {paddedRow
                  .fill(null, row.length, longestRow.length)
                  .map((col, key) => (
                    <React.Fragment key={key}>
                      {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}{" "}
                    </React.Fragment>
                  ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {footerRows.length > 0 && (
        <Table>
          <TableBody>
            {footerRows.map((row, i) => (
              <TableData key={i}>
                {row.map((col, key) => (
                  <React.Fragment key={key}>
                    {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}
                  </React.Fragment>
                ))}
              </TableData>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default InfoTable;
