import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
import {PostInfo} from "../types/PostData.ts";
import {ProductInfo} from "../types/ProductData.ts";
export default async function uploadData(data: PostInfo | ProductInfo, endpoint: string) {
  return await axios.post(`${BASE_URL + endpoint}.json`, JSON.stringify(data))
}