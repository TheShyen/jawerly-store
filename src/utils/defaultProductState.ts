import {ProductInfo} from "../types/ProductData.ts";

export const defaultProductState:ProductInfo = {
    id: '',
    title: '',
    category: '',
    description: '',
    price: Number(''),
    gender: '',
    link: '',
    previewImageId: '',
    imagesIds: []
}