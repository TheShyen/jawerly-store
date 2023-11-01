import { defineStore } from 'pinia';
import {ref} from "vue";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL_DATABASE
const IMAGE_URL = import.meta.env.VITE_BASE_URL_FORIMAGE

function calculateIndex(array, element) {
  return array.value?.findIndex((item) => item.id === element.id);
}
export const useAppStore = defineStore('appStore', ()=> {
  const news = ref([]);
  const products = ref([])
  const posts = ref([])
  const fullDataProducts = ref([])
  const fullDataPosts = ref([])
  const isLoading = ref(false)
  async function getProducts() {
    try {
      const response = await axios.get(`${URL}products.json`);
      products.value = Object.values(response.data);
      fullDataProducts.value = Object.entries(response.data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts () {
    try {
      const response = await axios.get(`${URL}posts.json`);
      posts.value = Object.values(response.data)
      fullDataPosts.value = Object.entries(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  function getProduct(id) {
    return products.value.find((item) => item.id == id.value)
  }
  function getPost(id) {
    return posts.value.find((item) => item.id == id.value)
  }
  function getFullProductInfo(product) {
    return fullDataProducts.value.find((item) => item[1] === product)
  }
  function getFullPostInfo(post) {
    return fullDataPosts.value.find((item) => item[1] === post)
  }
  async function addProduct(selectedFile, product) {
    isLoading.value = true;
    try {
      await axios
        .post(`${URL}products.json`, JSON.stringify(product))
        .then(response => {
          products.value.push(product)
        })
      for (let item of selectedFile.value) {
        await axios
          .post(`${IMAGE_URL + item.name}`, {
            item
          }, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })

      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false;
    }
  }
  async function addPost(selectedFile, post) {
    isLoading.value = true;
    await axios
      .post(`${URL}posts.json`, JSON.stringify(post))
      .then(response => {
        posts.value.push(post)
      })
      .catch(error => {
        console.error(error);
      });
    for (let item of selectedFile.value) {
      try {
        await axios
          .post(`${IMAGE_URL + item.name}`, {
            item
          }, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }
  }
  async function deleteProduct(id, product) {
    products.value.splice(calculateIndex(id, product),1);
    await axios.delete(`${URL}/products/${id}.json`)
      .catch(error => {
        console.error(error);
      })
  }
  async function deletePost(id, post) {
    posts.value.splice(calculateIndex(id, post),1);
    await axios.delete(`${URL}/posts/${id}.json`)
      .catch(error => {
        console.error(error);
      })
  }

  async function updateProduct(id, product) {
    await axios.patch(`${URL}/products/${id}.json`, JSON.stringify(product))
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      })
  }

  return {
    news,
    products,
    fullDataProducts,
    posts,
    isLoading,
    getProducts,
    getPosts,
    getProduct,
    getFullProductInfo,
    getFullPostInfo,
    getPost,
    addProduct,
    addPost,
    deleteProduct,
    updateProduct,
    deletePost
  }
})