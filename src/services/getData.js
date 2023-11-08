import axios from "axios";
import {URL} from "../constants/URL.js";
export default async function getDataFromApi(endpoint) {
  return await axios.get(`${URL + endpoint}.json`)
}