import { Tab, Tabs } from "@/components";
import { AdjusmentNoteSection } from "@/features/adjustment-notes";
import { CollateralsSection } from "@/features/collaterals";
import { FollowUpsSection } from "@/features/follow-ups";
import {
  loanClient,
  LoanFormArmotization,
  LoanInfo,
  loanModulePermissionsProvider,
} from "@/features/loans";
import { ProfileInfo } from "@/features/profiles";
import { createReportLayoutOption } from "@/features/reports";
import { TransactionSection } from "@/features/transactions";
import { EntityLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";

export async function generateMetadata({ params }: AppPageProps) {
  return { title: `Préstamo #${params.id}` };
}

const Page = async ({ params }: AppPageProps) => {
  const loan = await loanClient.getLoan(params.id);

  return (
    <EntityLayout
      title={`Préstamo #${loan.id}`}
      extraOptions={[
        createReportLayoutOption("loan", { key: params.id }),
        {
          title: "Hacer Pago",
          href: `/transactions/create/?loanId=${params.id}}&value=${loan.paymentValue}`,
          icon: "credit_card",
        },
      ]}
      edit={true}
      isEditDisabled={loan?.hasPayments}
      permissionsProvider={loanModulePermissionsProvider}
      editDisabledTooltip="No se puede editar un préstamo que ya tiene transacciones registradas"
    >
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Información">
          <LoanInfo loan={loan} />
        </Tab>
        <Tab eventKey="collaterals" title="Garantías">
          <CollateralsSection loanId={loan.id} />
        </Tab>
        <Tab eventKey="account-statements" title="Estado de Cuenta">
          <TransactionSection loanId={loan.id} />
        </Tab>
        <Tab eventKey="notes" title="Notas">
          <AdjusmentNoteSection loanId={loan.id} />
        </Tab>
        <Tab eventKey="follow-ups" title="Seguimientos">
          <FollowUpsSection loanId={loan.id} />
        </Tab>
        <Tab eventKey="armotization" title="Amortización">
          <LoanFormArmotization loanId={loan.id} />
        </Tab>
        <Tab eventKey="client" title="Cliente">
          <ProfileInfo id={loan.clientId} />
        </Tab>
        <Tab eventKey="loanOfficer" title="Agente">
          <ProfileInfo id={loan.loanOfficerId} />
        </Tab>
        <Tab eventKey="guarantor" title="Garante">
          <ProfileInfo id={loan.guarantorId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
