import { useParams } from "@/hooks/useParams";
import useCollateral from "../hooks/useCollateral";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { toAllTitleCase } from "@/utils/utils";
import {
  COLLATERAL_DISABLED_MESSAGES_CONSTANTS,
  collateralModulePermissionsProvider,
  isCollateralized,
} from "../lib/constants";
import { Tab, Tabs } from "@/components/Tabs";
import CollateralInfo from "../components/CollateralInfo";
import LoanInfo from "@/features/Loans/components/LoanInfo";
import ProfileInfo from "@/features/Profiles/components/ProfileInfo";
import CollateralFilesExplorer from "../components/CollateralFilesExplorer";
import useRestoreCollateralization from "../hooks/useRestoreCollateralization";
import useLiquidateCollateral from "../hooks/useLiquidateCollateral";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";

const CollateralPage = () => {
  const { id } = useParams();
  const { collateral, isLoading } = useCollateral({ id });
  const { restoreCollateralization } = useRestoreCollateralization();
  const { liquidateCollateral } = useLiquidateCollateral();

  if (!collateral || isLoading) return <></>;

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
        <Tab path="info" title="Garantía">
          <CollateralInfo collateral={collateral} />
        </Tab>
        <Tab path={"loan"} title={"Préstamo"}>
          <LoanInfo id={collateral.loanId} />
        </Tab>
        <Tab path="client" title={"Cliente"}>
          <ProfileInfo id={collateral.ownerId} />
        </Tab>
        <Tab path={"files"} title="Archivos">
          <CollateralFilesExplorer collateral={collateral} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default CollateralPage;
