import { Role } from "../models/role";
import { User } from "../models/user";
import { useState } from "react";
import ChangeUserPasswordFormModal from "./ChangeUserPasswordFormModal";
import { EntityDataTableProps } from "@/models";
import usePermissions from "../hooks/usePermissions";
import { DateLabel, LinkLabel, LoadingSpinner } from "@/components/ui";
import { EntityDataTable } from "@/components/DataTable";
import {
  getRandomName,
  showColumnsIfAssertion,
  toAllTitleCase,
} from "@/utils/utils";
import { usersModuleRootPath, usersQueryKey } from "../lib/constants";
import { getUserModulePermissions, getUsers } from "../services/userService";
import { useRouter } from "@/hooks/useRouter";
import { Column } from "@/components/DataTable/models/column";
import { TEST } from "@/utils/constants";
import { UserQuery } from "../models/userQuery";

type UsersDataTableProps = EntityDataTableProps<User, UserQuery> & {
  role?: Role;
};

const columns: Column<User>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.createdAt} />,
  },
  {
    accessorKey: "username",
    header: "Usuario",
    enableSorting: true,
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
];

const UsersDataTable = ({ role = "admin", ...props }: UsersDataTableProps) => {
  const router = useRouter();
  const [userToChangePassword, setUserToChangePassword] = useState<
    User | undefined
  >();

  const { permissions, isLoading } = usePermissions({
    getPermissions: getUserModulePermissions,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <EntityDataTable
        title="usuario"
        validateProject={false}
        columns={[
          ...columns,
          ...showColumnsIfAssertion<User>(permissions!.canCreate, [
            {
              header: "Editar",
              cell: ({ row }) => (
                <LinkLabel
                  to={`${usersModuleRootPath}/users/${row.original.id}/edit`}
                >
                  Editar
                </LinkLabel>
              ),
            },
            {
              header: "Permisos",
              cell: ({ row }) => (
                <LinkLabel
                  to={`${usersModuleRootPath}/permissions/${row.original.id}`}
                >
                  Permisos
                </LinkLabel>
              ),
            },
            {
              header: "Contraseña",
              cell: ({ row }) => (
                <LinkLabel
                  onClick={() => {
                    setUserToChangePassword(row.original);
                  }}
                >
                  Modificar
                </LinkLabel>
              ),
            },
          ]),
        ]}
        cacheKey={[...usersQueryKey, role]}
        loader={getUsers}
        onRowClick={(u: User) => router.push(`/access-control/users/${u.id}`)}
        {...props}
      />
      {userToChangePassword && (
        <ChangeUserPasswordFormModal
          show={!!userToChangePassword}
          onHide={() => setUserToChangePassword(undefined)}
          user={userToChangePassword}
        />
      )}
    </>
  );
};

export default UsersDataTable;
