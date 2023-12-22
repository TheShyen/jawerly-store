import {ProductInfo} from "../types/ProductData.ts";

export const generateDefaultProductState = () :ProductInfo => { return {
    id: '',
    title: '',
    category: '',
    description: '',
    price: 0,
    gender: '',
    link: '',
    previewImageId: '',
    imagesIds: []
}}