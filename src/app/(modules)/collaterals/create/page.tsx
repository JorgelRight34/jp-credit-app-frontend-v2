import {
  CollateralForm,
  collateralModulePermissionsProvider,
} from "@/features/collaterals";
import { FormPageLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Garantía",
};

const Page = () => {
  return (
    <FormPageLayout
      title="Garantía"
      permissionsProvider={collateralModulePermissionsProvider}
    >
      <CollateralForm />
    </FormPageLayout>
  );
};

export default Page;
