import {
  userClient,
  UserDetails,
  userModulePermissionsProvider,
} from "@/features/auth";
import { EntityLayout } from "@/layouts";
import { getFullName } from "@/utils/utils";
import { Tab, Tabs } from "@/components";
import { LoansSection } from "@/features/loans";
import { TransactionSection } from "@/features/transactions";
import { FollowUpsSection } from "@/features/follow-ups";
import { AppPageProps } from "@/models/appPageProps";

const Page = async ({ params }: AppPageProps<{ id: number }>) => {
  const user = await userClient.getUser(params.id);

  return (
    <EntityLayout
      title={`${getFullName(user)} (${user.username})`}
      edit={true}
      permissionsProvider={userModulePermissionsProvider}
    >
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Datos">
          <UserDetails user={user} />
        </Tab>
        <Tab eventKey="loans" title="Préstamos">
          <LoansSection createdBy={user.id} />
        </Tab>
        <Tab eventKey="transactions" title="Transacciones">
          <TransactionSection createdBy={user.id} />
        </Tab>
        <Tab eventKey="follow-ups" title="Seguimientos">
          <FollowUpsSection createdBy={user.id} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
