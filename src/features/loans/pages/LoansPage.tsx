import { LoanStatus } from "../models/loanStatus";
import LoansSection from "../components/LoansSection";
import { loanModulePermissionsProvider } from "../services/loanClient";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { Tab, Tabs } from "@/components/Tabs";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";

const LoansPage = () => {
  return (
    <EntityLayout
      title="Préstamos"
      extraOptions={[createReportLayoutOption("loan")]}
      permissionsProvider={loanModulePermissionsProvider}
      showChooseProjectBtn={true}
      create={true}
    >
      <Tabs defaultActiveKey="active">
        <Tab path="active" title="Activos">
          <LoansSection navigate={true} status={LoanStatus.Active} />
        </Tab>
        <Tab path="paid-off" title="Saldados">
          <LoansSection navigate={true} status={LoanStatus.PaidOff} />
        </Tab>
        <Tab path="overdue" title="Atrasados">
          <LoansSection navigate={true} status={LoanStatus.Overdue} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default LoansPage;
