import React, { ReactNode, useMemo } from "react";
import "./dataTable.css";
import clsx from "clsx";

interface InfoTableProps {
  data: (string | number | ReactNode)[][];
  footerRows?: (string | number | ReactNode)[][];
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
        data[0]
      ),
    [data]
  );

  return (
    <div
      className={clsx(
        `table-wrapper px-0 w-full border rounded-3 shadow-sm`,
        className
      )}
    >
      <table className="data-table w-full">
        <tbody>
          {data.map((row, i) => {
            const paddedRow = [
              ...row,
              ...Array(longestRow.length - row.length).fill(null),
            ];

            return (
              <tr key={i}>
                {paddedRow
                  .fill(null, row.length, longestRow.length)
                  .map((col, key) => (
                    <React.Fragment key={key}>
                      {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}{" "}
                    </React.Fragment>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {footerRows.length > 0 && (
        <table className="w-100">
          <tbody>
            {footerRows.map((row, i) => (
              <tr key={i}>
                {row.map((col, key) => (
                  <React.Fragment key={key}>
                    {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InfoTable;
