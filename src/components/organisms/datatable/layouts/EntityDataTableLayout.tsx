import React from "react";

type EntityDataTableLayoutProps = React.PropsWithChildren;

const QuerySearch = ({ children }: React.PropsWithChildren) => (
  <div className="mb-3">{children}</div>
);
const DataTable = ({ children }: React.PropsWithChildren) => children;

const EntityDataTableLayout = ({ children }: EntityDataTableLayoutProps) => {
  return <>{children}</>;
};

EntityDataTableLayout.QuerySearch = QuerySearch;
EntityDataTableLayout.DataTable = DataTable;

export default EntityDataTableLayout;
