import axios from "axios";

export default async function getBlobFromImage(url: string) {
  return await axios.get(url, {
    responseType: 'blob'
  });
}