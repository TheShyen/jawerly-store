import { createRouter, createWebHistory } from 'vue-router';
import Main from "../pages/Main.vue";
import Catalog from "../pages/Catalog.vue";
import Product from "../pages/Product.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/catalog',
    component: Catalog
  },
  {
    path: '/product',
    component: Product
  }
];

const router = createRouter({
  history: createWebHistory('/jawerly-store/'),
  routes,
});

export default router;