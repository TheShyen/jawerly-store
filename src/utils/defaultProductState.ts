import {ProductInfo} from "../types/ProductData.ts";

export const generateDefaultProductState = () :ProductInfo => { return {
    id: '',
    title: '',
    category: '',
    description: '',
    price: Number(''),
    gender: '',
    link: '',
    previewImageId: '',
    imagesIds: []
}}