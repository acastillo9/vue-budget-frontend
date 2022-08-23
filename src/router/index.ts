import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/DashboardView/DashboardView.vue"),
      meta: {
        layout: "DashboardLayout",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView/LoginView.vue"),
      meta: {
        layout: "EmptyLayout",
      },
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
