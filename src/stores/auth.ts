import { defineStore } from "pinia";
import router from "@/router";
import * as fetch from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

const initUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return undefined;
  }
  return JSON.parse(user);
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: initUser(),
    returnUrl: "",
  }),
  actions: {
    async login(username: string, password: string) {
      const user = await fetch.post(`${baseUrl}/login`, {
        username,
        password,
      });

      // update pinia state
      this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
