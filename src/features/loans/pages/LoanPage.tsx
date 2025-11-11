import { useParams } from "@/hooks/useParams";
import useLoan from "../hooks/useLoan";
import { loanModulePermissionsProvider } from "../services/loanClient";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { Tab, Tabs } from "@/components/Tabs";
import LoanInfo from "../components/LoanInfo";
import CollateralsSection from "@/features/Collaterals/components/CollateralsSection";
import TransactionSection from "@/features/Transactions/components/TransactionSection";
import FollowUpsSection from "@/features/FollowUp/components/FollowUpsSection";
import ProfileInfo from "@/features/Profiles/components/ProfileInfo";
import LoanArmotization from "@/features/Armotizations/components/LoanAmortization";
import AdjusmentNoteSection from "@/features/AdjustmentNotes/components/AdjusmentNoteSection";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";

const LoanPage = () => {
  const { id } = useParams();
  const { loan } = useLoan({ id });

  if (!loan) return;

  return (
    <EntityLayout
      title={`Préstamo #${loan.id}`}
      extraOptions={[
        createReportLayoutOption("loan", { key: id }),
        {
          title: "Hacer Pago",
          href: `/transactions/create/?loanId=${id}&value=${loan.paymentValue}`,
          icon: "credit_card",
        },
      ]}
      edit={true}
      isEditDisabled={loan?.hasPayments}
      permissionsProvider={loanModulePermissionsProvider}
      editDisabledTooltip="No se puede editar un préstamo que ya tiene transacciones registradas"
    >
      <Tabs defaultActiveKey="info">
        <Tab path="info" title="Información">
          <LoanInfo loan={loan} />
        </Tab>
        <Tab path="collaterals" title="Garantías">
          <CollateralsSection loanId={loan.id} />
        </Tab>
        <Tab path="account-statements" title="Estado de Cuenta">
          <TransactionSection loanId={loan.id} />
        </Tab>
        <Tab path="notes" title="Notas">
          <AdjusmentNoteSection loanId={loan.id} />
        </Tab>
        <Tab path="follow-ups" title="Seguimientos">
          <FollowUpsSection loanId={loan.id} />
        </Tab>
        <Tab path="armotization" title="Amortización">
          <LoanArmotization loanId={loan.id} />
        </Tab>
        <Tab path="client" title="Cliente">
          <ProfileInfo id={loan.clientId} />
        </Tab>
        <Tab path="loanOfficer" title="Agente">
          <ProfileInfo id={loan.loanOfficerId} />
        </Tab>
        <Tab path="guarantor" title="Garante">
          <ProfileInfo id={loan.guarantorId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default LoanPage;
