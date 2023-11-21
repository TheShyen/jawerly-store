import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
export default async function updateData(item, endpoint) {
  await axios.patch(`${BASE_URL}/${endpoint}/${item.id}.json`, JSON.stringify(item))
}