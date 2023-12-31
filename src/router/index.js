import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import SingleApartment from "../pages/apartments/SingleApartment.vue";
import ApartmentsPage from "../pages/apartments/ApartmentsPage.vue";
import AdvancedSearch from "../pages/apartments/AdvancedSearch.vue";
import ApartmentForm from "../pages/apartments/ApartmentForm.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/advancedsearch",
      name: "AdvancedSearch",
      component: AdvancedSearch,
    },
    {
      path: "/apartment/:id",
      name: "SingleApartment",
      component: SingleApartment,
    },
    {
      path: "/apartments",
      name: "apartments",
      component: ApartmentsPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found-page",
      component: NotFoundPage,
    },
    { path: "/form", name: "FormPage", component: ApartmentForm },
  ],
});

export { router };

