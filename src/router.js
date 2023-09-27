import { createRouter, createWebHistory } from "vue-router";

import SingleApartment from "./pages/SingleApartment.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/apartment/:slug",
      name: "SingleApartment",
      component: SingleApartment,
    },
  ],
});

export { router };
