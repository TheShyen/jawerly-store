import axios from "axios";
import {URL} from "../constants/URL.js";
export default async function uploadData(data, endpoint) {
  return await axios.post(`${URL + endpoint}.json`, JSON.stringify(data))
}