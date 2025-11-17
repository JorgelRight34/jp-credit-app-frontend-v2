import { Tab, Tabs } from "@/components";
import {
  loanModulePermissionsProvider,
  LoansSection,
  LoanStatus,
} from "@/features/loans";
import { createReportLayoutOption } from "@/features/reports";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Préstamos",
};

const Page = () => {
  return (
    <EntityLayout
      title="Préstamos"
      extraOptions={[createReportLayoutOption("loan")]}
      permissionsProvider={loanModulePermissionsProvider}
      showChooseProjectBtn={true}
      create={true}
    >
      <Tabs defaultActiveKey="active">
        <Tab eventKey="active" title="Activos">
          <LoansSection navigate={true} status={LoanStatus.Active} />
        </Tab>
        <Tab eventKey="paid-off" title="Saldados">
          <LoansSection navigate={true} status={LoanStatus.PaidOff} />
        </Tab>
        <Tab eventKey="overdue" title="Atrasados">
          <LoansSection navigate={true} status={LoanStatus.Overdue} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
