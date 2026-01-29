import { ProfileRole } from "@/features/profiles";

export type Query = {
  id?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  adminId?: number;
  projectId?: number;
  orderBy?: string;
  orderDesc?: boolean
  profileId?: number;
  loanId?: number;
  createdBy?: number;
  profileAs?: ProfileRole;
  limit?: number;
}
