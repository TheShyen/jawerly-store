import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Main from "../pages/Main.vue";
import Catalog from "../pages/Catalog.vue";
import Product from "../pages/Product.vue";
import Posts from "../pages/Posts.vue";
import Post from "../pages/Post.vue";
import Authorization from "../pages/Authorization.vue";
import AddProduct from "../pages/AddProduct.vue";
import EditProduct from "../pages/EditProduct.vue";
import EditPost from "../pages/EditPost.vue";
import AddPost from "../pages/AddPost.vue";
import {useAuthStore} from "../stores/auth.js";

interface CustomRoute extends RouteRecordRaw {
  meta?: {
    auth?: boolean;
  };
}

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
    component: Authorization,
  },
  {
    path: '/addProduct',
    component: AddProduct,
    meta: {
      auth: true
    }
  },
  {
    path: '/addPost',
    component: AddPost,
    meta: {
      auth: true
    }
  },
  {
    path: '/editProduct/:productId',
    component: EditProduct,
    meta: {
      auth: true
    }
  },
  {
    path: '/editPost/:postId',
    component: EditPost,
    meta: {
      auth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory('/jawerly-store/'),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if(to.meta.auth && !authStore.userInfo.token) {
    next('/login')
  } else {
    next()
  }
})
export default router;