import { EntitySection, EntitySectionProps } from "@/components";
import ReportsDataTable from "./ReportsDataTable";
import ReportsQuerySearch from "./ReportsQuerySearch";
import { ReportQuery } from "../models/reportQuery";
import { Report } from "../models/report";

type ReportsSectionProps = EntitySectionProps<Report, ReportQuery>;

const ReportsSection = ({ ...props }: ReportsSectionProps) => {
  return (
    <EntitySection
      Search={ReportsQuerySearch}
      DataTable={ReportsDataTable}
      {...props}
    />
  );
};

export default ReportsSection;
