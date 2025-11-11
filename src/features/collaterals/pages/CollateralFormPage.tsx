import { useParams } from "@/hooks/useParams";
import useCollateral from "../hooks/useCollateral";
import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import CollateralForm from "../components/CollateralForm";
import {
  COLLATERAL_DISABLED_MESSAGES_CONSTANTS,
  collateralModulePermissionsProvider,
} from "../lib/constants";
import { deleteCollateral } from "../services/collateralsClient";

const CollateralFormPage = () => {
  const { id } = useParams();
  const { collateral, isLoading } = useCollateral({ id });

  return (
    <FormLayoutPage
      title="Garantía"
      edit={!!collateral}
      permissionsProvider={collateralModulePermissionsProvider}
      onDelete={collateral ? () => deleteCollateral(collateral?.id) : undefined}
      deleteDisabledTooltip={
        COLLATERAL_DISABLED_MESSAGES_CONSTANTS.DELETE_DISABLED_MESSAGE
      }
      isLoading={isLoading}
    >
      <CollateralForm edit={collateral} />
    </FormLayoutPage>
  );
};

export default CollateralFormPage;
