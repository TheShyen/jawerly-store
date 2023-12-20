import {PostInfo} from "../types/PostData.ts";
import {ProductInfo} from "../types/ProductData.ts";

export function validationFields(obj: PostInfo | ProductInfo) {
    for (let key in obj) {
        if (!obj[key as keyof (PostInfo | ProductInfo)]) {
            return false;
        }
    }
    return true;
}