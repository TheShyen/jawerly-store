export default function getImgUrl(id) {
  return `${import.meta.env.VITE_BASE_URL_FORIMAGE}${id}?alt=media`
}

