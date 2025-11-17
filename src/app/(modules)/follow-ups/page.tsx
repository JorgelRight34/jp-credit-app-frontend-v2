import {
  followUpPermissionsProvider,
  FollowUpsSection,
} from "@/features/follow-ups";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguimientos",
};

const Page = () => {
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

export default Page;
