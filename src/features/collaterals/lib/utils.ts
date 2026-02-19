import { Collateral } from "../models/collateral";

export const getCollateralStatus = (collateral: Collateral): string => {
    if (collateral.sellDate) return "Vendido";
    if (collateral.liquidationDate) return "Líquidado";
    if (collateral.isActive) return "Activo"

    return "Inactivo"
}