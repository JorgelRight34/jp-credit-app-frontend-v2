import { Query } from "../../../models/query";
import { CollateralAgreementType } from "./collateralAgreementType";
import { CollateralStatus } from "./collateralStatus";

export interface CollateralQuery extends Query {
  page?: number;
  title?: string;
  id?: number;
  status?: CollateralStatus;
  profileId?: number;
  type?: CollateralAgreementType;
}
