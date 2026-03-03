import { FieldValues } from "react-hook-form";

export interface Query extends FieldValues {
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
  limit?: number;
  all?: boolean;
  option?: number;
  exportAs?: string;
  exportPageFrom?: string;
  exportPageTill?: string;
  exportPageLimit?: number;
}
