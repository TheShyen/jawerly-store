import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
import urlConstruction from "../utils/urlConstruction.js";


export default async function getFilteredData(endpoint, param) {
  return await axios.get(urlConstruction(BASE_URL, endpoint, param))
}