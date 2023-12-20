import {PostInfo} from "../types/PostData.ts";

export const generateDefaultPostState = ():PostInfo=> { return {
    id: '',
    title: '',
    description: '',
    postDate: '',
    imageId: '',
}}