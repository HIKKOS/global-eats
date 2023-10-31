import axios from "axios";
export const routes = [
  {
    path: "/",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/products",
    component: () => import("../views/ProductsPage.vue"),
  },
  {
    path: "/users",
    component: () => import("../views/UsersPage.vue"),
  },
  {
    path: "/categories",
    component: () => import("../views/CategoriesPage.vue"),
  },
  {
    path: "/uwu",
    component: () => import("../views/LandingPage.vue"),
  },
];

export const baseURL = "http://localhost:3000/api";
