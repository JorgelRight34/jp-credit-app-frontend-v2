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
  profileAs?: any;
  limit?: number;
  all?: boolean;
}
