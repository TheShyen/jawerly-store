import axios from "axios";
import {BASE_URL} from "../constants/URL.js";
import urlConstruction from "../utils/urlConstruction.ts";


export default async function getFilteredData(endpoint: string, param:{orderBy: string, equalTo: string}) {
  return await axios.get(urlConstruction(BASE_URL, endpoint, param))
}