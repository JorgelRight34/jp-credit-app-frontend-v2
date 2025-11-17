"use client";

import { Tab, Tabs } from "@/components";
import {
  Collateral,
  COLLATERAL_DISABLED_MESSAGES_CONSTANTS,
  CollateralFilesExplorer,
  CollateralInfo,
  collateralModulePermissionsProvider,
  isCollateralized,
  useLiquidateCollateral,
  useRestoreCollateralization,
} from "@/features/collaterals";
import { LoanInfo } from "@/features/loans";
import { ProfileInfo } from "@/features/profiles";
import { createReportLayoutOption } from "@/features/reports";
import { EntityLayout } from "@/layouts";
import { toAllTitleCase } from "@/utils/utils";

interface CollateralPageClientProps {
  collateral: Collateral;
}

const CollateralPageClient = ({ collateral }: CollateralPageClientProps) => {
  const { restoreCollateralization } = useRestoreCollateralization();
  const { liquidateCollateral } = useLiquidateCollateral();

  return (
    <EntityLayout
      title={toAllTitleCase(collateral.title || "") || ""}
      permissionsProvider={collateralModulePermissionsProvider}
      extraOptions={[
        createReportLayoutOption("collateral"),
        {
          title: "Restaurar",
          icon: "undo",
          onClick: () => restoreCollateralization(collateral.id),
        },
        {
          title: "Liquidar",
          icon: "rocket_launch",
          onClick: () => liquidateCollateral(collateral.id),
        },
      ]}
      editDisabledTooltip={
        COLLATERAL_DISABLED_MESSAGES_CONSTANTS.EDIT_DISABLED_MESSAGE
      }
      isEditDisabled={isCollateralized(collateral)}
      edit={true}
    >
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Garantía">
          <CollateralInfo collateral={collateral} />
        </Tab>
        <Tab eventKey={"loan"} title={"Préstamo"}>
          <LoanInfo id={collateral.loanId} />
        </Tab>
        <Tab eventKey="client" title={"Cliente"}>
          <ProfileInfo id={collateral.ownerId} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <CollateralFilesExplorer collateral={collateral} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default CollateralPageClient;
