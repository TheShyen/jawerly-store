import { defineStore } from 'pinia';
import {computed, ref} from "vue";
import axios from "axios";
export const useAppStore = defineStore('appStore', ()=> {
  const news = ref([]);
  const products = ref([])
  const posts = ref([])
  async function getProducts() {
    try {
      const response = await axios.get('https://saros-api-v3-production.up.railway.app/api/v3/products');
      products.value = response.data
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts () {
    try {
      const response = await axios.get('https://saros-api-v3-production.up.railway.app/api/v3/posts');
      posts.value = response.data
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  function getCurrentProduct(id) {
    return products.value.find((item) => item.id == id.value)
  }
  function getCurrentPost(id) {
    return posts.value.find((item) => item.id == id.value)
  }

  return {
    news,
    products,
    posts,
    getProducts,
    getPosts,
    getCurrentProduct,
    getCurrentPost
  }
})