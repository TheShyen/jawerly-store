import axios from "axios";
import {IMAGE_URL} from "../constants/URL.js";

export default async function uploadImages(selectedFile) {
  for (let item of selectedFile.value) {
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