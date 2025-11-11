import { useMemo } from "react";
import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import { QuerySearchProps } from "../../../components/EntityQuerySearch/models/querySearchProps";
import { FollowUpQuery } from "../models/followUpQuery";
import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { profileRolesSpanishTranslations } from "@/features/Profiles/lib/constants";
import { toTitleCase } from "@/utils/utils";
import EntityQuerySearch from "@/components/EntityQuerySearch/components/EntityQuerySearch";

type FollowUpQuerySearchProps = QuerySearchProps<FollowUpQuery> & {
  profileAs?: ProfileRole;
};

const FollowUpQuerySearch = ({
  onSubmit,
  defaultValues,
  ...props
}: FollowUpQuerySearchProps) => {
  const fields = useMemo<QuerySearchInput<FollowUpQuery>[]>(
    () => [
      {
        name: "id",
        id: "id",
        label: "Id",
      },
      {
        name: "profileId",
        id: "profileId",
        label:
          toTitleCase(
            profileRolesSpanishTranslations[
              defaultValues?.profileAs ?? "profile"
            ],
          ) ?? "",
        type: "profile",
      },
      {
        name: "loanId",
        id: "loanId",
        label: "Préstamo",
        type: "loan",
        searchOnChange: true,
      },
      {
        name: "body",
        id: "body",
        label: "Texto",
      },
    ],
    [defaultValues],
  );

  return <EntityQuerySearch onSubmit={onSubmit} fields={fields} {...props} />;
};

export default FollowUpQuerySearch;
