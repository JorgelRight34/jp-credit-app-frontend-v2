import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { Tab, Tabs } from "@/components/Tabs";
import ClientAccountStatementsSection from "../components/ClientAccountStatements/ClientAccountStatementsSection";
import GuarantorAccountStatementsSection from "../components/GuarantorAccountStatements/GuarantorAccountStatementsSection";
import GeneralAccountStatementSection from "../components/GeneralAccountStatements/GeneralAccountStatementSection";

const AccountStatementsPage = () => {
  return (
    <EntityLayout title="Estados de Cuenta">
      <Tabs defaultActiveKey="all">
        <Tab path="all" title="Estados de Cuenta General">
          <GeneralAccountStatementSection />
        </Tab>
        <Tab path="client" title="Estados de Cuenta Cliente">
          <ClientAccountStatementsSection />
        </Tab>
        <Tab path="guarantor" title="Estados de Cuenta Garante">
          <GuarantorAccountStatementsSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default AccountStatementsPage;
