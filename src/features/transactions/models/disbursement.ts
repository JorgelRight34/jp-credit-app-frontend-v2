import { Transaction } from "./transaction";

export interface Disbursement extends Transaction {
    type: "ds"
}