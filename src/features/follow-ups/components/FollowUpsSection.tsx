import FollowUpDataTable from "./FollowUpDataTable";
import { FollowUpQuery } from "../models/followUpQuery";
import FollowUpQuerySearch from "./FollowUpQuerySearch";
import { FollowUp } from "../models/followUp";
import { EntitySection, EntitySectionProps } from "@/components";

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
