import {defineStore} from 'pinia';
import {ref} from "vue";
import getDataFromApi from "../services/getData.js";
import uploadData from "../services/uploadData.js";
import uploadImages from "../services/uploadImages.js";
import deleteData from "../services/deleteData.js";
import updateData from "../services/updateData.js";
import getFilteredData from "../services/getFilteredData.js";
import {ProductInfo} from "../types/ProductData.ts";
import {PostInfo} from "../types/PostData.ts";


function calculateIndex(array: ProductInfo[] | PostInfo[], element: PostInfo | ProductInfo) {
  return array.findIndex((item: ProductInfo | PostInfo) => item.id === element.id);
}

export const useAppStore = defineStore('appStore', ()=> {
  const products = ref<ProductInfo[]>([])
  const posts = ref<PostInfo[]>([])
  const isLoading = ref<boolean>(false)

  function reformatProductData(data: Record<string, any>): ProductInfo[] {
    return Object.keys(data).map(key => {
      return {
        ...data[key],
        id: key,
        price: parseInt(data[key].price)
      };
    });
  }
    function reformatPostData(data: Record<string, any>): PostInfo[] {
        return Object.keys(data).map(key => {
            return {
                ...data[key],
                id: key,
            };
        });
    }
  async function getProductsByCategory(categoryValue: string): Promise<void> {
    try {
      isLoading.value = true;
      const response = await getFilteredData('products.json', {orderBy: '"category"', equalTo: `"${categoryValue}"`});
      products.value = reformatProductData(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      isLoading.value = false;
    }
  }
  function sortProductsByPrice(sort: string): void {
    if (sort === 'По цене ↑') {
      products.value.sort((a, b) => a.price - b.price);
    } else {
      products.value.sort((a, b) => b.price - a.price);
    }
  }
  async function getProducts(): Promise<void> {
    try {
      const response = await getDataFromApi('products');
      products.value = reformatProductData(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function getPosts (): Promise<void> {
    try {
      const response = await getDataFromApi('posts');
      posts.value = reformatPostData(response.data)
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  function getProduct(id: string): ProductInfo | undefined {
    return products.value.find((item) => item.id == id)
  }
  function getPost(id: string): PostInfo | undefined {
    return posts.value.find((item) => item.id == id)
  }

  async function addProduct(selectedFile: object[], product: ProductInfo): Promise<void>  {
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
  async function addPost(selectedFile: object[], post: PostInfo): Promise<void> {
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
  async function deleteProduct(product: ProductInfo): Promise<void> {
    try {
      await deleteData(product, 'products')
      products.value.splice(calculateIndex(products.value, product),1)
    } catch (error) {
      console.log(error)
    }
  }
  async function deletePost(post: PostInfo): Promise<void> {
    try {
      await deleteData(post, 'posts')
      posts.value.splice(calculateIndex(posts.value, post),1)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateProduct(product: ProductInfo): Promise<void> {
    isLoading.value = true;
    try {
      await updateData(product, 'products')
    } catch(error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  async function updatePost(post: PostInfo): Promise<void> {
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
    products,
    posts,
    isLoading,
    getProducts,
    getProductsByCategory,
    sortProductsByPrice,
    getPosts,
    getProduct,
    getPost,
    addProduct,
    addPost,
    deleteProduct,
    updateProduct,
    updatePost,
    deletePost
  }
})