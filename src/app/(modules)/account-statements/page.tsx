import { Tab, Tabs } from "@/components";
import {
  ClientAccountStatementSection,
  GeneralAccountStatementSection,
  GuarantorAccountStatementSection,
} from "@/features/account-statements";
import { EntityLayout } from "@/layouts";

const Page = () => {
  return (
    <EntityLayout title="Estados de Cuenta">
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Estados de Cuenta General">
          <GeneralAccountStatementSection />
        </Tab>
        <Tab eventKey="client" title="Estados de Cuenta Cliente">
          <ClientAccountStatementSection />
        </Tab>
        <Tab eventKey="guarantor" title="Estados de Cuenta Garante">
          <GuarantorAccountStatementSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
