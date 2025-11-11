import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import LoanForm from "../components/LoanForm";
import { useParams } from "@/hooks/useParams";
import useLoan from "../hooks/useLoan";
import { loanModulePermissionsProvider } from "../services/loanClient";

const LoanFormPage = () => {
  const { id } = useParams();
  const { loan, isLoading } = useLoan({ id });

  return (
    <FormLayoutPage
      title={loan ? `Préstamo #${id}` : "Préstamo"}
      edit={!!loan}
      permissionsProvider={loanModulePermissionsProvider}
      isLoading={isLoading}
      validateProject={true}
    >
      <LoanForm edit={loan} />
    </FormLayoutPage>
  );
};

export default LoanFormPage;
