import axios from "axios";
import {URL} from "../constants/URL.js";
export default async function updateData(item, endpoint) {
  await axios.patch(`${URL}/${endpoint}/${item.id}.json`, JSON.stringify(item))
}