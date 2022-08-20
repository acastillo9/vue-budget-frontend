import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import Login from "@/views/Login/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }

  if (to.path === "/login" && auth.user) {
    return "/";
  }
});

export default router;
