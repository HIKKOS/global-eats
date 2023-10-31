import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "../views/ProductsPage.vue";
import LandingPage from "../views/LandingPage.vue";
import UsersPage from "../views/UsersPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { name: "Login", path: "/login", component: LoginPage },
    {
      path: "/",
      component: LoginPage,
    },
    {
      path: "/products",
      component: ProductsPage,
    },
    {
      path: "/users",
      component: UsersPage,
    },
    {
      path: "/categories",
      component: CategoriesPage,
    },
    {
      path: "/uwu",
      component: LandingPage,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwt");
  // If logged in, or going to the Login page.
  if (token || to.name === "Login") {
    // Continue to page.
    next();
  } else {
    // Not logged in, redirect to login.
    next({ name: "Login" });
  }
});
export default router;
