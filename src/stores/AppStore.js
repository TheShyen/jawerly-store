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
    return data.forEach(item => {
      item[1].id = item[0]
    })
  }
  async function getProducts() {
    try {
      const response = await getDataFromApi('products');
      reformatData(Object.entries(response.data))
      products.value = Object.values(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts () {
    try {
      const response = await getDataFromApi('posts');
      reformatData(Object.entries(response.data))
      posts.value = Object.values(response.data)
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
        .then(() => {
          products.value.push(product)
        })
      await uploadImages(selectedFile)
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
        .then(() => {
          posts.value.push(post)
        })
      await uploadImages(selectedFile)
    } catch (error) {
      console.error(error);
    } finally {
        isLoading.value = false;
      }

  }
  async function deleteProduct(product) {
    await deleteData(product, 'products')
      .then(() => products.value.splice(calculateIndex(products, product),1))
      .catch(error => {
        console.error(error);
      })
  }
  async function deletePost(post) {
   await deleteData(post, 'posts')
      .then(() => posts.value.splice(calculateIndex(posts, post),1))
      .catch(error => {
        console.error(error);
      })
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