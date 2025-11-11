import { Tab, Tabs } from "@/components/Tabs";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import AdjusmentNoteSection from "../components/AdjusmentNoteSection";
import { adjustmenNotesPermissionsProvider } from "../services/adjustmentNoteClient";

const AdjusmentNotesPage = () => {
  return (
    <EntityLayout
      title="Notas de Ajuste"
      create={true}
      permissionsProvider={adjustmenNotesPermissionsProvider}
    >
      <Tabs defaultActiveKey="all">
        <Tab path="all" title="Todos">
          <AdjusmentNoteSection />
        </Tab>
        <Tab path="credit" title="Crédito">
          <AdjusmentNoteSection type="nc" />
        </Tab>
        <Tab path="debit" title="Débito">
          <AdjusmentNoteSection type="nd" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default AdjusmentNotesPage;
