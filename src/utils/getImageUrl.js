import {IMAGE_URL} from "../constants/URL.js";
export default function getImgUrl(id) {
  return `${IMAGE_URL}${id}?alt=media`
}

