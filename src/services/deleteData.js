import axios from "axios";
import {URL} from "../constants/URL.js";
export default async function deleteData(item, endpoint) {
  await axios.delete(`${URL}/${endpoint}/${item.id}.json`)
}