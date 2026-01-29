import { QuerySearchInput, QuerySearchProps } from "@/models";
import { UserQuery } from "../models/userQuery";
import EntityQuerySearch from "@/components/EntityQuerySearch/components/EntityQuerySearch";

type UserQuerySearchProps = QuerySearchProps<UserQuery>;

const UserQuerySearch = ({ ...props }: UserQuerySearchProps) => {
  const fields: QuerySearchInput<UserQuery>[] = [
    {
      name: "firstName",
      label: "Nombres",
      id: "firstName",
    },
    {
      name: "lastName",
      label: "Apellidos",
      id: "lastName",
    },
    {
      name: "username",
      label: "Usuario",
      id: "username",
    },
  ];

  return <EntityQuerySearch fields={fields} {...props} />;
};

export default UserQuerySearch;
