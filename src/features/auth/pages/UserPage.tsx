import { useUser } from "../hooks/useUser";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { getFullName } from "@/utils/utils";
import { Tab, Tabs } from "@/components/Tabs";
import LoansSection from "@/features/Loans/components/LoansSection";
import { useParams } from "@/hooks/useParams";
import TransactionSection from "@/features/Transactions/components/TransactionSection";
import FollowUpsSection from "@/features/FollowUp/components/FollowUpsSection";
import UserDetails from "../components/UserDetails";
import { userModulePermissionsProvider } from "../lib/constants";

const UserPage = () => {
  const { id } = useParams();
  const { user, isLoading } = useUser({ id });

  if (isLoading || !user) return <></>;

  return (
    <EntityLayout
      title={`${getFullName(user)} (${user.username})`}
      edit={true}
      permissionsProvider={userModulePermissionsProvider}
    >
      <Tabs defaultActiveKey="info">
        <Tab path="info" title="Datos">
          <UserDetails user={user} />
        </Tab>
        <Tab path="loans" title="Préstamos">
          <LoansSection createdBy={user.id} />
        </Tab>
        <Tab path="transactions" title="Transacciones">
          <TransactionSection createdBy={user.id} />
        </Tab>
        <Tab path="follow-ups" title="Seguimientos">
          <FollowUpsSection createdBy={user.id} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default UserPage;
