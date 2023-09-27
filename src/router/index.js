import { createRouter, createWebHistory } from "vue-router";

import SingleApartment from "../pages/SingleApartment.vue";
import ApartmentsPage from "../pages/ApartmentsPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/", name: "home", component: HomePage },
    {
      path: "/apartment/:id",
      name: "SingleApartment",
      component: SingleApartment,
    },
    { path: "/", name: "apartments", component: ApartmentsPage },
    { path: "/:pathMatch(.*)*", component: NotFoundPage },
  ],
});

export { router };
