import { defineStore } from 'pinia';
import {computed, ref} from "vue";
import axios from "axios";
import uniqid from "uniqid";
export const useAppStore = defineStore('appStore', ()=> {
  const news = ref([]);
  const products = ref([])
  const posts = ref([])

  async function getProducts() {
    try {
      const response = await axios.get('https://jawerly-store-768cb-default-rtdb.europe-west1.firebasedatabase.app/products.json');
      products.value = Object.values(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts () {
    try {
      const response = await axios.get('http://147.78.66.209:8080/api/v3/posts');
      posts.value = response.data
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

  async function addProduct(selectedFile, product) {
    await axios
      .post(`https://jawerly-store-768cb-default-rtdb.europe-west1.firebasedatabase.app/products.json`, JSON.stringify({
        ...product
      }), {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(response => {
        products.value.push(product)
      })
      .catch(error => {
        console.error(error);
      });

    for (let item of selectedFile.value) {
      await axios
        .post(`https://firebasestorage.googleapis.com/v0/b/jawerly-store-768cb.appspot.com/o/images%2F${item.name}`, {
          item
        }, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        .catch(error => {
          console.error( error);
        });
    }
  }

  return {
    news,
    products,
    posts,
    getProducts,
    getPosts,
    getProduct,
    getPost,
    addProduct
  }
})