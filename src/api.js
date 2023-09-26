import axios from "axios";

export async function getNews () {
  try {
    const response = await axios.get('https://saros-api-v3-production.up.railway.app/api/v3/news');
    return response.data
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
export async function getProducts () {
  try {
    const response = await axios.get('https://saros-api-v3-production.up.railway.app/api/v3/products');
    return response.data
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
