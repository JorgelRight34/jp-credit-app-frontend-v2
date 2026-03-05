import { collateralTypeMap } from "../models/collateralType";
import { CollateralConditionMap } from "../models/collateralCondition";
import type { CollateralType } from "../models/collateralType";
import type { CollateralCondition } from "../models/collateralCondition";
import type { SelectOptions } from "@/components";
import { FileModel } from "@/models/fileModel";
import { ND } from "@/lib/utils";

export const collateralsQueryKey = "collaterals"

export const collateralMainPicFallback = "/product-placeholder.png?url"

export const defaultCollateralPicFileModel: FileModel = {
    isImage: true,
    publicId: ND,
    id: 0,
    name: "Default",
    url: collateralMainPicFallback,
    fileType: "png"
}

export const collateralConditionTranslations: Record<
    CollateralCondition,
    string
> = {
    [CollateralConditionMap.HIGH_QUALITY]: "Alta calidad",
    [CollateralConditionMap.LOW_QUALITY]: "Baja calidad",
    [CollateralConditionMap.STABLE]: "Estable",
    [CollateralConditionMap.DEPRECIATING]: "Depreciando",
    [CollateralConditionMap.LIQUID]: "Líquido",
    [CollateralConditionMap.ILLIQUID]: "Ilíquido",
    [CollateralConditionMap.LOW_RISK]: "Bajo riesgo",
    [CollateralConditionMap.HIGH_RISK]: "Alto riesgo",
    [CollateralConditionMap.EASILY_RECOVERABLE]: "Fácil de recuperar",
    [CollateralConditionMap.VOLATILE]: "Volátil",
    [CollateralConditionMap.SECURE]: "Seguro",
    [CollateralConditionMap.UNDERVALUED]: "Subvalorado",
    [CollateralConditionMap.OVERVALUED]: "Sobrevalorado",
    [CollateralConditionMap.APPRECIATING]: "Apreciando",
    [CollateralConditionMap.DIVERSIFIED]: "Diversificado",
    [CollateralConditionMap.CONCENTRATED]: "Concentrado",
};

export const collateralTypeTranslations: Record<
    CollateralType,
    string
> = {
    [collateralTypeMap.carLoan]: "Préstamo de vehículo",
    [collateralTypeMap.mortgage]: "Hipoteca",
    [collateralTypeMap.agriculturalLoan]: "Préstamo agrícola",
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


const generateOptions = (record: Record<string, string>) =>
    Object.keys(record)
        .map((key) => [
            key,
            record[String(key)] || "",
        ])
        .sort((a, b) => a[1].localeCompare(b[1])) as SelectOptions;

export const collateralConditionsOptions = generateOptions(
    collateralConditionTranslations
);

export const collateralTypeOptions = generateOptions(
    collateralTypeTranslations
);
