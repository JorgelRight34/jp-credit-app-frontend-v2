import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import FollowUpsSection from "../components/FollowUpsSection";
import { followUpPermissionsProvider } from "../services/followUpClient";

const FollowUpsPage = () => {
  return (
    <EntityLayout
      title="Seguimientos"
      permissionsProvider={followUpPermissionsProvider}
      showChooseProjectBtn={true}
      create={true}
    >
      <div className="pt-3">
        <FollowUpsSection />
      </div>
    </EntityLayout>
  );
};

export default FollowUpsPage;
