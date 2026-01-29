import { CREATE_URL_SUFFIX } from "../../../lib/utils/constants";
import { collateralsBasePath } from "./constants";

export const createCollateralsCreatePath = (tab?: string) => {
  console.log(
    `${collateralsBasePath}/${tab ? `${tab}/` : ""}${CREATE_URL_SUFFIX}`
  );
  return `${collateralsBasePath}/${tab ? `${tab}/` : ""}${CREATE_URL_SUFFIX}`;
};
