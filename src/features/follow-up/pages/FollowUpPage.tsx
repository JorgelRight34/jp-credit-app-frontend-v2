import { useParams } from "@/hooks/useParams";
import useFollowUp from "../hooks/useFollowUp";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import FollowUpInfo from "../components/FollowUpInfo";
import { LoadingSpinner } from "@/components/ui";
import { Tab, Tabs } from "@/components/Tabs";
import LoanInfo from "@/features/Loans/components/LoanInfo";

const FollowUpPage = () => {
  const { id } = useParams();
  const { followUp, isLoading } = useFollowUp({ id });

  if (isLoading) return <LoadingSpinner />;

  return (
    <EntityLayout title={`${followUp.title}`} edit={true}>
      <Tabs defaultActiveKey="info">
        <Tab path="info" title="Seguimiento">
          <FollowUpInfo followUp={followUp} />
        </Tab>
        <Tab path="loan" title="Préstamo">
          <LoanInfo id={followUp.loanId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default FollowUpPage;
