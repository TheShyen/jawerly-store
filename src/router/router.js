import { createRouter, createWebHistory } from 'vue-router';
import Main from "../pages/Main.vue";
import Catalog from "../pages/Catalog.vue";
import Product from "../pages/Product.vue";
import Posts from "../pages/Posts.vue";
import Post from "../pages/Post.vue";
import Authorization from "../pages/Authorization.vue";
import AddProduct from "../pages/AddProduct.vue";
import EditProduct from "../pages/EditProduct.vue";
import EditPost from "../pages/EditPost.vue";

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
    path: '/posts',
    component: Posts
  },
  {
    path: '/product/:productId',
    component: Product
  },
  {
    path: '/posts/:postId',
    component: Post
  },
  {
    path: '/login',
    component: Authorization
  },
  {
    path: '/add',
    component: AddProduct
  },
  {
    path: '/editProduct/:productId',
    component: EditProduct
  },
  {
    path: '/editPost/:postId',
    component: EditPost
  }
];

const router = createRouter({
  history: createWebHistory('/jawerly-store/'),
  routes,
});

export default router;