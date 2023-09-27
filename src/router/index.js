import { createRouter, createWebHistory } from "vue-router";

import SingleApartment from "../pages/apartments/SingleApartment.vue";
import ApartmentsPage from "../pages/apartments/ApartmentsPage.vue";
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
    {
      path: "/:pathMatch(.*)*",
      name: "not-found-page",
      component: NotFoundPage,
    },
  ],
});

export { router };
