import { Tab, Tabs } from "@/components";
import {
  CollateralAgreementType,
  collateralModulePermissionsProvider,
  CollateralsSection,
  CollateralStatus,
} from "@/features/collaterals";
import { createReportLayoutOption } from "@/features/reports";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garantías",
};

const Page = () => {
  return (
    <EntityLayout
      title="Garantías"
      extraOptions={[createReportLayoutOption("collateral")]}
      permissionsProvider={collateralModulePermissionsProvider}
      create={true}
      showChooseProjectBtn={true}
    >
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Todos">
          <CollateralsSection />
        </Tab>
        <Tab eventKey="vehicles" title="Vehículos">
          <CollateralsSection type={CollateralAgreementType.CarLoan} />
        </Tab>
        <Tab eventKey="mobiliary" title="Hipotecas">
          <CollateralsSection type={CollateralAgreementType.Mortgage} />
        </Tab>
        <Tab eventKey="farm" title="Agrícola">
          <CollateralsSection type={CollateralAgreementType.AgriculturalLoan} />
        </Tab>
        <Tab eventKey="collateralizations" title="Liquidados">
          <CollateralsSection status={CollateralStatus.USED_FOR_SETTLEMENT} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
