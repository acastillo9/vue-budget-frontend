import * as fetch from "@/helpers/fetch";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const me = async () => {
  return fetch.get(`${BASE_URL}/me`);
};
