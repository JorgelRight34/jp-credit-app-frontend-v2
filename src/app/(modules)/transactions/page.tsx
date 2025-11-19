import { Tab, Tabs } from "@/components";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";
import {
  transactionPermissionsProvider,
  TransactionSection,
  TransactionType,
} from "@/features/transactions";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transacciones",
};

const Page = () => {
  return (
    <EntityLayout
      title="Transacciones"
      permissionsProvider={transactionPermissionsProvider}
      extraOptions={[
        {
          title: "Cerrar Período",
          icon: "close",
          href: "/transactions/close-periods/create",
        },
        createReportLayoutOption("transaction"),
      ]}
      create={true}
      showChooseProjectBtn={true}
    >
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Transacciones">
          <TransactionSection />
        </Tab>
        <Tab eventKey="incomes" title="Ingresos">
          <TransactionSection type={TransactionType.PC} />
        </Tab>
        <Tab eventKey="expenses" title="Egresos">
          <TransactionSection type={TransactionType.DS} />
        </Tab>
        <Tab eventKey="overdue" title="Cuotas Atrasadas">
          <TransactionSection isLate={true} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
