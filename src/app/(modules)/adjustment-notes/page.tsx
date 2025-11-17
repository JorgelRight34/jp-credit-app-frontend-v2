import { Tab, Tabs } from "@/components";
import {
  AdjusmentNoteSection,
  adjustmenNotesPermissionsProvider,
} from "@/features/adjustment-notes";
import { EntityLayout } from "@/layouts";

const Page = () => {
  return (
    <EntityLayout
      title="Notas de Ajuste"
      create={true}
      permissionsProvider={adjustmenNotesPermissionsProvider}
    >
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Todos">
          <AdjusmentNoteSection />
        </Tab>
        <Tab eventKey="credit" title="Crédito">
          <AdjusmentNoteSection type="nc" />
        </Tab>
        <Tab eventKey="debit" title="Débito">
          <AdjusmentNoteSection type="nd" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
