import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
export default async function getDataFromApi(endpoint: string) {
  return await axios.get(`${BASE_URL + endpoint}.json`)
}