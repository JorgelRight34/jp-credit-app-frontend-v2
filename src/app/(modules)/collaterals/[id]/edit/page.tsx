import {
  COLLATERAL_DISABLED_MESSAGES_CONSTANTS,
  collateralClient,
  CollateralForm,
  collateralModulePermissionsProvider,
} from "@/features/collaterals";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { toAllTitleCase } from "@/utils/utils";

export async function generateMetadata({ params }: AppPageProps) {
  const collateral = await collateralClient.getCollateral(params.id);

  return {
    title: `Editar ${toAllTitleCase(collateral.title)}`,
  };
}

const Page = async ({ params }: AppPageProps) => {
  const collateral = await collateralClient.getCollateral(params.id);

  return (
    <FormPageLayout
      title="Garantía"
      edit={!!collateral}
      permissionsProvider={collateralModulePermissionsProvider}
      onDelete={
        collateral
          ? () => collateralClient.deleteCollateral(collateral?.id)
          : undefined
      }
      deleteDisabledTooltip={
        COLLATERAL_DISABLED_MESSAGES_CONSTANTS.DELETE_DISABLED_MESSAGE
      }
    >
      <CollateralForm edit={collateral} />
    </FormPageLayout>
  );
};

export default Page;
