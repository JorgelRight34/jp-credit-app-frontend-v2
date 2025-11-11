import FollowUpDataTable from "./FollowUpDataTable";
import { FollowUpQuery } from "../models/followUpQuery";
import FollowUpQuerySearch from "./FollowUpQuerySearch";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import { FollowUp } from "../models/followUp";
import EntitySection from "@/components/EntitySection/components/EntitySection";

type FollowUpsSection = EntitySectionProps<FollowUp, FollowUpQuery>;

const FollowUpsSection = ({ ...props }: FollowUpsSection) => {
  return (
    <EntitySection
      Search={FollowUpQuerySearch}
      DataTable={FollowUpDataTable}
      {...props}
    />
  );
};

export default FollowUpsSection;
