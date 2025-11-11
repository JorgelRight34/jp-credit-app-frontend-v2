import { User } from "../models/user";
import UserInfoTable from "./UserInfoTable";

interface UserDetailsProps {
  user: User;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div className="flex p-3">
      <UserInfoTable user={user} />
    </div>
  );
};

export default UserDetails;
