import { Tab, Tabs } from "@/components";
import { followUpClient, FollowUpInfo } from "@/features/follow-ups";
import { LoanInfo } from "@/features/loans";
import { EntityLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { toAllTitleCase } from "@/utils/utils";

export async function generateMetadata({ params }: AppPageProps) {
  const followUp = await followUpClient.getFollowUp(params.id);

  return { title: toAllTitleCase(followUp.title) };
}

const Page = async ({ params }: AppPageProps) => {
  const followUp = await followUpClient.getFollowUp(params.id);

  return (
    <EntityLayout title={`${followUp.title}`} edit={true}>
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Seguimiento">
          <FollowUpInfo followUp={followUp} />
        </Tab>
        <Tab eventKey="loan" title="Préstamo">
          <LoanInfo id={followUp.loanId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
