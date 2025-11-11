import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import { AdjustmentNote } from "../models/adjusment-note";
import { AdjustmentNoteQuery } from "../models/adjusment-note-query";
import AdjusmentNoteQuerySearch from "./AdjustmentNoteQuerySearch";
import AdjusmentNoteDatatable from "./AdjusmentNoteDatatable";
import EntitySection from "@/components/EntitySection/components/EntitySection";

type AdjusmentNoteSectionProps = EntitySectionProps<
  AdjustmentNote,
  AdjustmentNoteQuery
>;

const AdjusmentNoteSection = ({ ...props }: AdjusmentNoteSectionProps) => {
  return (
    <EntitySection
      Search={AdjusmentNoteQuerySearch}
      DataTable={AdjusmentNoteDatatable}
      {...props}
    />
  );
};

export default AdjusmentNoteSection;
