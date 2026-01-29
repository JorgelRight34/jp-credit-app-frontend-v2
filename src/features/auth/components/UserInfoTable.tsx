import { InfoTable } from "@/components/DataTable";
import { User } from "../models/user";

interface UserInfoTableProps {
  user: User;
}

const UserInfoTable = ({ user }: UserInfoTableProps) => {
  return (
    <InfoTable
      data={[
        ["Usuario", user.username, "Id", user.id, "Correo", user.email],
        ["Nombres", user.firstName, "Apellidos", user.lastName],
      ]}
    />
  );
};

export default UserInfoTable;
