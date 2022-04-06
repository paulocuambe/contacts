import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contacts/:id",
      name: "contact.details",
      component: () => import("../views/ContactDetailsView.vue"),
    },
  ],
});

export default router;
