import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
export default async function deleteData(item, endpoint) {
  await axios.delete(`${BASE_URL}/${endpoint}/${item.id}.json`)
}