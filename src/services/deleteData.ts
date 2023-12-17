import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
import {PostInfo} from "../types/PostData.ts";
import {ProductInfo} from "../types/ProductData.ts";
export default async function deleteData(item: PostInfo | ProductInfo, endpoint: string) {
  await axios.delete(`${BASE_URL}/${endpoint}/${item.id}.json`)
}