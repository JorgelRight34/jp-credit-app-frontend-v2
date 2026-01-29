import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { getProfilesReportBlob } from "../services/profilesClient";
import { ProfileQuery } from "../models/profileQuery";
import { ProfileRole } from "../models/profileRole";

interface ProfileQuerySearchProps extends QuerySearchProps<ProfileQuery> {
  role?: ProfileRole;
}

const fields: QuerySearchInput<ProfileQuery>[] = [
  {
    name: "names",
    label: "Buscar",
    id: "names",
    col: 9,
  },
  {
    name: "dni",
    label: "Cédula",
    id: "dni",
    type: "dni",
  },
];

const ProfileQuerySearch = ({
  role = "client",
  ...props
}: ProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      fields={fields}
      onDownload={(query) => getProfilesReportBlob(role, query)}
      {...props}
    />
  );
};

export default ProfileQuerySearch;
