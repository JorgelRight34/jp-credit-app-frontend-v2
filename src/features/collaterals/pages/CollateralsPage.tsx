import CollateralsSection from "../components/CollateralsSection";
import { CollateralAgreementType } from "../models/collateralAgreementType";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { Tab, Tabs } from "@/components/Tabs";
import { collateralModulePermissionsProvider } from "../lib/constants";
import { CollateralStatus } from "../models/collateralStatus";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";

const CollateralsPage = () => {
  return (
    <EntityLayout
      title="Garantías"
      extraOptions={[createReportLayoutOption("collateral")]}
      permissionsProvider={collateralModulePermissionsProvider}
      create={true}
      showChooseProjectBtn={true}
    >
      <Tabs defaultActiveKey="all">
        <Tab path="all" title="Todos">
          <CollateralsSection />
        </Tab>
        <Tab path="vehicles" title="Vehículos">
          <CollateralsSection type={CollateralAgreementType.CarLoan} />
        </Tab>
        <Tab path="mobiliary" title="Hipotecas">
          <CollateralsSection type={CollateralAgreementType.Mortgage} />
        </Tab>
        <Tab path="farm" title="Agrícola">
          <CollateralsSection type={CollateralAgreementType.AgriculturalLoan} />
        </Tab>
        <Tab path="collateralizations" title="Liquidados">
          <CollateralsSection status={CollateralStatus.USED_FOR_SETTLEMENT} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default CollateralsPage;
