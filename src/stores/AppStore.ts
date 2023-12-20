import {defineStore} from 'pinia';
import {ref} from "vue";
import getDataFromApi from "../services/getData.ts";
import uploadData from "../services/uploadData.ts";
import uploadImages from "../services/uploadImages.ts";
import deleteData from "../services/deleteData.ts";
import updateData from "../services/updateData.ts";
import getFilteredData from "../services/getFilteredData.ts";
import {ProductInfo} from "../types/ProductData.ts";
import {PostInfo} from "../types/PostData.ts";
import {generateDefaultPostState} from "../utils/defaultPostState.ts";
import {generateDefaultProductState} from "../utils/defaultProductState.ts";


function calculateIndex(array: ProductInfo[] | PostInfo[], element: PostInfo | ProductInfo) {
  return array.findIndex((item: ProductInfo | PostInfo) => item.id === element.id);
}

export const useAppStore = defineStore('appStore', ()=> {
  const products = ref<ProductInfo[]>([])
  const posts = ref<PostInfo[]>([])
  const isLoading = ref<boolean>(false)

  function reformatProductData(data: Record<string, ProductInfo>): ProductInfo[] {
    return Object.keys(data).map(key => {
      return {
        ...data[key],
        id: key,
        price: parseInt(String(data[key].price))
      };
    });
  }
    function reformatPostData(data: Record<string, PostInfo>): PostInfo[] {
        return Object.keys(data).map(key => {
            return {
                ...data[key],
                id: key,
            };
        });
    }
  async function getProductsByFilters(params: {orderBy: string, equalTo: string}): Promise<void> {
    try {
      isLoading.value = true;
      const response = await getFilteredData('products.json', params);
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
  function getProduct(id: string): ProductInfo {
    return products.value.find((item) => item.id == id) || generateDefaultProductState()
  }
  function getPost(id: string): PostInfo {
    return posts.value.find((item) => item.id == id) || generateDefaultPostState()
  }

  async function addProduct(selectedFile: File[], product: ProductInfo): Promise<void>  {
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
  async function addPost(selectedFile: File[], post: PostInfo): Promise<void> {
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
    getProductsByFilters,
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