import { CollateralAgreementType } from "../models/collateralAgreementType";
import { CollateralStatus } from "../models/collateralStatus";
import { CollateralCondition } from "../models/collateralCondition";
import {
    CREATE_URL_SUFFIX,
} from "../../../lib/utils/constants";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { getCollateralModulePermissions } from "../services/collateralsClient";
import { CacheKey } from "@/models";
import { Collateral } from "../models/collateral";

export const collateralsQueryKey: CacheKey = ["collaterals"];
export const collateralsTag = "collaterals"

export const defaultCollateralPhotoUrl = "/product-placeholder.png";

export const collateralsBasePath = "/collaterals";

export const collateralsCreatePath =
    collateralsBasePath + "/" + CREATE_URL_SUFFIX;

export const collateralConditionSpanishTranslations: Record<
    CollateralCondition,
    string
> = {
    [CollateralCondition.HIGH_QUALITY]: "alta calidad",
    [CollateralCondition.LOW_QUALITY]: "baja calidad",
    [CollateralCondition.STABLE]: "estable",
    [CollateralCondition.DEPRECIATING]: "depreciando",
    [CollateralCondition.LIQUID]: "líquido",
    [CollateralCondition.ILLIQUID]: "ilíquido",
    [CollateralCondition.LOW_RISK]: "bajo riesgo",
    [CollateralCondition.HIGH_RISK]: "alto riesgo",
    [CollateralCondition.EASILY_RECOVERABLE]: "fácil de recuperar",
    [CollateralCondition.VOLATILE]: "volátil",
    [CollateralCondition.SECURE]: "seguro",
    [CollateralCondition.UNDERVALUED]: "subvalorado",
    [CollateralCondition.OVERVALUED]: "sobrevalorado",
    [CollateralCondition.APPRECIATING]: "apreciando",
    [CollateralCondition.DIVERSIFIED]: "diversificado",
    [CollateralCondition.CONCENTRATED]: "concentrado",
};

export const collateralStatusSpanishTranslations: Record<
    CollateralStatus,
    string
> = {
    [CollateralStatus.PENDING]: "pendiente",
    [CollateralStatus.APPROVED]: "aprobado",
    [CollateralStatus.REJECTED]: "rechazado",
    [CollateralStatus.UNDER_REVIEW]: "en revisión",
    [CollateralStatus.ACTIVE]: "activo",
    [CollateralStatus.INACTIVE]: "inactivo",
    [CollateralStatus.SEIZED]: "incautado",
    [CollateralStatus.RELEASED]: "liberado",
    [CollateralStatus.DEFAULTED]: "incumplido",
    [CollateralStatus.EXPIRED]: "vencido",
    [CollateralStatus.ON_HOLD]: "en espera",
    [CollateralStatus.USED_FOR_SETTLEMENT]: "liquidado",
};

export const collateralAgreementTypeSpanishTranslations: Record<
    CollateralAgreementType,
    string
> = {
    [CollateralAgreementType.CarLoan]: "Préstamo de vehículo",
    [CollateralAgreementType.Mortgage]: "Hipoteca",
    [CollateralAgreementType.AgriculturalLoan]: "Préstamo agrícola",
};

export const COLLATERAL_DISABLED_MESSAGES_CONSTANTS = {
    /**
     * Error message shown when trying to edit a collateral that's being used as loan payment
     * Displayed as tooltip or disabled state message
     */
    EDIT_DISABLED_MESSAGE:
        "No se puede editar una garantía que está siendo utilizada como pago de un préstamo",

    /**
     * Error message shown when trying to delete a collateral that's being used as loan payment
     * Displayed as tooltip or disabled state message
     */
    DELETE_DISABLED_MESSAGE:
        "No se puede eliminar una garantía que está siendo utilizada como pago de un préstamo",
} as const;

export const LIQUIDATE_COLLATERAL_CONSTANTS = {
    /**
     * Text that user must type to confirm the liquidation action
     * Used in TextConfirmationModal for secure confirmation
     */
    CONFIRMATION_MESSAGE: "LIQUIDAR GARANTIA",

    /**
     * Detailed description explaining the liquidation process and its consequences
     * Warns user about the irreversible nature of this action
     */
    CONFIRMATION_DESCRIPTION:
        "Esta acción convertirá la garantía en pago del préstamo y no se puede deshacer.",

    /**
     * Modal title for liquidation confirmation
     */
    MODAL_TITLE: "Confirmar Liquidación de Garantía",

    /**
     * Button text for confirmation action
     */
    CONFIRM_TEXT: "Liquidar Garantía",

    /**
     * Button text for cancel action
     */
    CANCEL_TEXT: "Cancelar",

    /**
     * Success message after successful liquidation
     */
    SUCCESS_MESSAGE: "La garantía ha sido liquidada exitosamente",

    /**
     * Error message when liquidation fails
     */
    ERROR_MESSAGE:
        "Error al liquidar la garantía. Por favor, inténtelo nuevamente",
} as const;

export const RESTORE_COLLATERAL_CONSTANTS = {
    /**
     * Modal title for collateral restoration confirmation
     */
    TITLE: "Confirmar Restauración de Garantía",

    /**
     * Success message displayed after successful collateral restoration
     */
    SUCCESS_MESSAGE:
        "La garantía ha sido restaurada exitosamente y está disponible para operaciones normales",

    /**
     * Text that user must type to confirm the restoration action
     */
    CONFIRMATION_MESSAGE: "RESTAURAR GARANTIA",

    /**
     * Detailed description explaining the restoration process
     */
    DESCRIPTION:
        "Esta acción restaurará la garantía a su estado activo anterior. Una vez restaurada, la garantía volverá a estar disponible para operaciones normales.",

    /**
     * Button text for confirmation action
     */
    CONFIRM_TEXT: "Restaurar Garantía",

    /**
     * Button text for cancel action
     */
    CANCEL_TEXT: "Cancelar",

    /**
     * Button label for the trigger element
     */
    BUTTON_LABEL: "Restaurar",
} as const;

export const collateralModulePermissionsProvider: PermissionsProvider = {
    getPermissions: getCollateralModulePermissions,
    cacheKey: collateralsQueryKey
}

export const isCollateralized = (collateral: Collateral) =>
    collateral?.status === CollateralStatus.USED_FOR_SETTLEMENT;