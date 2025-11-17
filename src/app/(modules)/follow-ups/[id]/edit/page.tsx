import {
  followUpClient,
  FollowUpForm,
  followUpPermissionsProvider,
} from "@/features/follow-ups";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { toAllTitleCase } from "@/utils/utils";

export async function generateMetadata({ params }: AppPageProps) {
  const followUp = await followUpClient.getFollowUp(params.id);

  return { title: FORM_PAGE_TITLES.edit(toAllTitleCase(followUp.title)) };
}

const Page = async ({ params }: AppPageProps) => {
  const followUp = await followUpClient.getFollowUp(params.id);

  return (
    <FormPageLayout
      title="Seguimiento"
      edit={!!followUp}
      permissionsProvider={followUpPermissionsProvider}
      onDelete={() => followUpClient.deleteFollowUp(followUp.id)}
    >
      <FollowUpForm edit={followUp} />
    </FormPageLayout>
  );
};

export default Page;
