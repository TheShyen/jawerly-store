import axios from "axios";
import {URL} from "../constants/URL.js";
export default async function getFilteredData(endpoint, params) {
  return await axios.get(`${URL + endpoint}.json${params}`)
}