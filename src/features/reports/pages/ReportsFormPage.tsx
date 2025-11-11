import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import { reportsModulePermissionsProvider } from "../lib/constants";
import ReportsForm from "../components/ReportsForm";
import { useParams } from "@/hooks/useParams";
import { useReport } from "../hooks/useReport";
import { deleteReport } from "../services/reportsClient";

const ReportsFormPage = () => {
  const { id } = useParams();
  const { report, isLoading } = useReport({ id });

  return (
    <FormLayoutPage
      permissionsProvider={reportsModulePermissionsProvider}
      title="Reporte"
      edit={!!report}
      isLoading={isLoading}
      deleteConfirmationMessage="Deseo borrar este reporte"
      onDelete={() => deleteReport(report!.id)}
    >
      <ReportsForm />
    </FormLayoutPage>
  );
};

export default ReportsFormPage;
