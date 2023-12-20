import axios from "axios";
import {IMAGE_URL} from "../constants/URL.js";

export default async function uploadImages(selectedFile: File[]) {
  for (let item of selectedFile) {
    await axios
      .post(`${IMAGE_URL + item.name}`, {
        item
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
  }
}