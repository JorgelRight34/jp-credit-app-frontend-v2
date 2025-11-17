import {
  FollowUpForm,
  followUpPermissionsProvider,
} from "@/features/follow-ups";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Seguimiento"),
};

const Page = () => {
  return (
    <FormPageLayout
      title="Seguimiento"
      permissionsProvider={followUpPermissionsProvider}
    >
      <FollowUpForm />
    </FormPageLayout>
  );
};

export default Page;
