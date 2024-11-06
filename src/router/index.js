import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/TimerView.vue")
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue")
    },
    {
      path: "/sets",
      name: "sets",
      component: () => import("../views/SetsView.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue")
    }
  ]
});

export default router;
