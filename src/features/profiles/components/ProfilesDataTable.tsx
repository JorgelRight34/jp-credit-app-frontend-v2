import { ProfileQuery } from "../models/profileQuery";
import { profilesQueryKey } from "../lib/constants";
import { Column } from "@/components/DataTable/models/column";
import { Profile } from "../models/profile";
import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { EntityDataTableProps } from "@/models";
import { getAge, getRandomName, toAllTitleCase } from "@/utils/utils";
import { getProfiles } from "../services/profilesClient";
import { EntityDataTable } from "@/components/DataTable";
import { useRouter } from "@/hooks/useRouter";
import { DateLabel, PhoneLink } from "@/components/ui";
import { TEST } from "@/utils/constants";

type ProfilesDataTableProps = EntityDataTableProps<Profile, ProfileQuery> & {
  role?: ProfileRole;
  removeFromRole?: boolean;
};

const columns: Column<Profile>[] = [
  {
    accessorKey: "id",
    header: "Id",
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.createdAt} />,
  },
  {
    accessorKey: "firstName",
    header: "Nombres",
    enableSorting: true,
    cell: ({ row }) =>
      TEST ? getRandomName() : toAllTitleCase(row.original.firstName),
  },
  {
    accessorKey: "lastName",
    header: "Apellidos",
    enableSorting: true,
    cell: ({ row }) =>
      TEST ? getRandomName() : toAllTitleCase(row.original.lastName),
  },
  {
    accessorKey: "dateOfBirth",
    header: "Edad",
    enableSorting: true,
    cell: ({ row }) => getAge(row.original.dateOfBirth),
  },
  { accessorKey: "gender", header: "Género", enableSorting: true },
  {
    accessorKey: "phoneNumber",
    header: "Celular",
    enableSorting: true,
    cell: ({ row }) => <PhoneLink phoneNumber={row.original.phoneNumber} />,
  },
];

const ProfilesDataTable = ({
  role = "profile",
  ...props
}: ProfilesDataTableProps) => {
  const router = useRouter();

  return (
    <EntityDataTable
      title="perfil"
      validateProject={false}
      columns={columns}
      cacheKey={[...profilesQueryKey, role]}
      loader={(query) => getProfiles(role, query)}
      onRowClick={(p: Profile) => router.push(`/profiles/${p.profileId}`)}
      {...props}
    />
  );
};

export default ProfilesDataTable;
