import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
export default async function uploadData(data, endpoint) {
  return await axios.post(`${BASE_URL + endpoint}.json`, JSON.stringify(data))
}