import { EntitySectionProps } from "@/components/EntitySection";
import { Report } from "../models/report";
import { ReportQuery } from "../models/reportQuery";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import ReportsDataTable from "./ReportsDataTable";
import ReportsQuerySearch from "./ReportsQuerySearch";

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
