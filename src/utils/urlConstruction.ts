export default function urlConstruction(baseURL: string, endpoint: string, params: {orderBy: string, equalTo: string}) {
  const url = new URL(endpoint, baseURL);
  const searchParams = new URLSearchParams(params)
  const newUrl = new URL(`${url.origin}${url.pathname}?${searchParams}`);
  return newUrl.href;
}