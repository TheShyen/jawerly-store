import {defineStore} from 'pinia';
import {ref} from "vue";
import getDataFromApi from "../services/getData.js";
import uploadData from "../services/uploadData.js";
import uploadImages from "../services/uploadImages.js";
import deleteData from "../services/deleteData.js";
import updateData from "../services/updateData.js";


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

  function reformatData(data) {
    return Object.keys(data).map(key => {
      return {
        ...data[key],
        id: key
      };
    });
  }
  async function getProducts() {
    try {
      const response = await getDataFromApi('products');
      products.value = reformatData(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts () {
    try {
      const response = await getDataFromApi('posts');
      posts.value = reformatData(response.data)
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
      await uploadData(product, 'products')
      await uploadImages(selectedFile)
      products.value.push(product)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false;
    }
  }
  async function addPost(selectedFile, post) {
    isLoading.value = true;
    try {
      await uploadData(post, 'posts')
      await uploadImages(selectedFile)
      posts.value.push(post)
    } catch (error) {
      console.error(error);
    } finally {
        isLoading.value = false;
      }

  }
  async function deleteProduct(product) {
    try {
      await deleteData(product, 'products')
      products.value.splice(calculateIndex(products, product),1)
    } catch (error) {
      console.log(error)
    }
  }
  async function deletePost(post) {
    try {
      await deleteData(post, 'posts')
      posts.value.splice(calculateIndex(posts, post),1)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateProduct(product) {
    isLoading.value = true;
    try {
      await updateData(product, 'products')
    } catch(error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  async function updatePost(post) {
    isLoading.value = true;
    try {
      await updateData(post, 'posts')
    } catch(error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
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
    updatePost,
    deletePost
  }
})