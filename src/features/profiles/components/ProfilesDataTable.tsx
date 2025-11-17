import { ProfileQuery } from "../models/profileQuery";
import { profilesQueryKey } from "../lib/constants";
import { Profile } from "../models/profile";
import { getAge, getRandomName, toAllTitleCase } from "@/utils/utils";
import { getProfiles } from "../services/profilesClient";
import { useRouter } from "@/hooks/useRouter";
import { TEST } from "@/utils/constants";
import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
  PhoneLink,
} from "@/components";
import { ProfileRole } from "../models/profileRole";

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
