import axios from "axios";

export default async function getBlobFromImage(url) {
  return await axios.get(url, {
    responseType: 'blob'
  });
}