import { Compound } from "../../Armotizations/models/compound";

export interface Project {
  id: number;
  name: string;
  loanCount?: number;
  collateralCount?: number;

  // Settings
  graceDays: number;
  defaultPenaltyRate: number;
  defaultCompound?: Compound;
}
