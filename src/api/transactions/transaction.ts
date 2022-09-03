import type TransactionType from "./TransactionType";

export default interface Transaction {
  _id?: string;
  amount: number;
  description: string;
  date: Date;
  transactionType: string;
}
