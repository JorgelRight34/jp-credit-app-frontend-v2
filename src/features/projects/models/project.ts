import { Compound } from "@/models/compound";

export interface Project {
  id: number;
  name: string;
  loanCount?: number;

  // Settings
  graceDays: number;
  defaultPenaltyRate: number;
  defaultCompound?: Compound;
}
