import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css"; // PrimeIcons
import "primeflex/primeflex.css";
import Aura from "@primevue/themes/aura";

import "./style.css";

import App from "./App.vue";
import Home from "./components/Home.vue";
import ListCourse from "./components/ListCourse.vue";

const pinia = createPinia();

export const routes = [
  {
    path: "/",
    redirect: "accueil",
  },
  {
    path: "/accueil",
    component: Home,
    name: "home",
    meta: { requiresAuth: false },
  },
  {
    path: "/liste_de_course",
    component: ListCourse,
    name: "liste_de_course",
    meta: { requiresAuth: false },
  },
  //   {
  //     path: "/projects",
  //     component: Projects,
  //     name: "projects",
  //     meta: { requiresAuth: true },
  //   },
  //   {
  //     path: "/projects/:id/",
  //     name: "project",
  //     component: Project,
  //     props: (route) => {
  //       return {
  //         ...route.params,
  //         ...{ id: Number.parseInt(route.params.id, 10) || undefined },
  //       };
  //     },
  //     meta: { requiresAuth: true },
  //   },
  //   // {
  //   //   path: "/projects/:id/export",
  //   //   name: "export",
  //   //   component: Export,
  //   //   props: (route) => {
  //   //     return {
  //   //       ...route.params,
  //   //       ...{ id: Number.parseInt(route.params.id, 10) || undefined },
  //   //     };
  //   //   },
  //   //   meta: { requiresAuth: true },
  //   // },
  //   {
  //     path: "/login",
  //     component: Login,
  //     name: "login",
  //   },
  {
    path: "/:pathMatch(.*)*", // Gestion des routes non trouvées
    redirect: "/accueil",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
