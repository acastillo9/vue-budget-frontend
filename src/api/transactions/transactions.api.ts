import * as fetch from "@/helpers/fetch";
import type Transaction from "./transaction";

const BASE_URL = `${import.meta.env.VITE_API_URL}/transactions`;

export const getTransactionTypes = async () => {
  return fetch.get(`${BASE_URL}/types`);
};

export const save = async (transaction: Transaction) => {
  return fetch.post(`${BASE_URL}`, transaction);
};

export const find = async () => {
  return fetch.get(`${BASE_URL}`);
};

export const remove = async (transactionId: string) => {
  return fetch.remove(`${BASE_URL}/${transactionId}`);
};

export const getBalance = async (): Promise<number> => {
  return fetch.get<number>(`${BASE_URL}/balance`);
};
