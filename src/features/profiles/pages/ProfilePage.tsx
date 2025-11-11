import { Tab, Tabs } from "@/components/Tabs";
import { useParams } from "@/hooks/useParams";
import useProfile from "../hooks/useProfile";
import NotFound from "@/pages/Error/NotFound";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { getFullName } from "@/utils/utils";
import ProfileInfo from "../components/ProfileInfo";
import LoansSection from "@/features/Loans/components/LoansSection";
import CollateralsSection from "@/features/Collaterals/components/CollateralsSection";
import TransactionSection from "@/features/Transactions/components/TransactionSection";
import FollowUpsSection from "@/features/FollowUp/components/FollowUpsSection";
import {
  profileAsQuerySearchOption,
  profileModulePermissionsProvider,
} from "../lib/constants";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile, isError, isLoading } = useProfile({ id });

  if (isError) return <NotFound />;
  if (isLoading || !profile) return <></>;

  return (
    <EntityLayout
      permissionsProvider={profileModulePermissionsProvider}
      title={getFullName(profile)}
      edit={true}
    >
      <Tabs defaultActiveKey="info">
        <Tab path="info" title="Datos">
          <ProfileInfo profile={profile} />
        </Tab>
        <Tab path="loans" title="Préstamos">
          <LoansSection
            profileId={profile.id}
            options={[profileAsQuerySearchOption]}
          />
        </Tab>
        <Tab path="collaterals" title="Garantías">
          <CollateralsSection profileId={profile.id} />
        </Tab>
        <Tab path="transactions" title="Transacciones">
          <TransactionSection profileId={profile.id} />
        </Tab>
        <Tab path="follow-ups" title="Seguimientos">
          <FollowUpsSection profileId={profile.id} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ProfilePage;
