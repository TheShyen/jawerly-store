
export default function urlConstruction(baseURL, endpoint, params) {
  const url = new URL(endpoint, baseURL);
  const searchParams = new URLSearchParams(params)
  const newUrl = new URL(`${url.origin}${url.pathname}?${searchParams}`);
  return newUrl.href;
}