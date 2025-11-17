import { Tab, Tabs } from "@/components";
import { CollateralsSection } from "@/features/collaterals";
import { FollowUpsSection } from "@/features/follow-ups";
import { LoansSection } from "@/features/loans";
import {
  profileAsQuerySearchOption,
  ProfileInfo,
  profileModulePermissionsProvider,
  profilesClient,
} from "@/features/profiles";
import { TransactionSection } from "@/features/transactions";
import { EntityLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { getFirstAndLastName, getFullName } from "@/utils/utils";

export async function generateMetadata({ params }: AppPageProps) {
  const profile = await profilesClient.getProfile(params.id);

  return { title: getFirstAndLastName(profile) };
}

const Page = async ({ params }: AppPageProps) => {
  const profile = await profilesClient.getProfile(params.id);

  return (
    <EntityLayout
      permissionsProvider={profileModulePermissionsProvider}
      title={getFullName(profile)}
      edit={true}
    >
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Datos">
          <ProfileInfo id={params.id} />
        </Tab>
        <Tab eventKey="loans" title="Préstamos">
          <LoansSection
            profileId={profile.id}
            search={{ extraOptions: [profileAsQuerySearchOption] }}
          />
        </Tab>
        <Tab eventKey="collaterals" title="Garantías">
          <CollateralsSection profileId={profile.id} />
        </Tab>
        <Tab eventKey="transactions" title="Transacciones">
          <TransactionSection profileId={profile.id} />
        </Tab>
        <Tab eventKey="follow-ups" title="Seguimientos">
          <FollowUpsSection profileId={profile.id} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
