import { Compound } from "@/models/compound";
import { ReactNode } from "react";

export interface Project {
  id: number;
  name: string;
  loanCount?: number;

  // Settings
  graceDays: number;
  defaultPenaltyRate: number;
  defaultCompound?: Compound;
}


export type PropsWithProjectId<T = {}> = { projectId: number | null; children?: ReactNode } & T
