import { Transaction } from "./transaction";

export interface Payment extends Transaction {
    type: "pc"
}