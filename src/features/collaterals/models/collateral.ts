import { Photo } from "@/models";
import { CollateralAgreementType } from "./collateralAgreementType";
import { CollateralCondition } from "./collateralCondition";
import { CollateralStatus } from "./collateralStatus";
import { CollateralFile } from "./collateralFile";
import { Loan } from "@/features/Loans/models/loan";
import { Profile } from "@/features/Profiles/models/profile";

export interface Collateral {
  id: number;
  title: string;
  description: string;
  value: number;
  documentUrl: string;
  ownerId: number;
  condition: CollateralCondition;
  createdAt: string;
  status: CollateralStatus;
  ownerName?: string;
  loanId: number;
  photos: Photo[];
  type: CollateralAgreementType;
  location?: string;
  expirationDate?: string;
  liquidationDate?: Date | string;
  files: CollateralFile[];
  loanClientName?: string;
  loan?: Loan;
  owner?: Profile;
}
