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
  profileAs?: any;
  limit?: number;
  all?: boolean;
  options?: number;
}
