import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css"; // PrimeIcons
import "primeflex/primeflex.css";
import Aura from "@primevue/themes/aura";

import "./style.css";

import App from "./App.vue";

const pinia = createPinia();

export const routes = [
  {
    path: "/",
    redirect: "",
  },
  //   {
  //     path: "/datasets",
  //     component: Datasets,
  //     name: "datasets",
  //     meta: { requiresAuth: true },
  //   },
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
