import * as fetch from "@/helpers/fetch";
import type User from "./user";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const me = async (): Promise<User> => {
  return fetch.get(`${BASE_URL}/me`);
};
