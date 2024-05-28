/**
 * Fetcher function for SWR
 * @param key URL to fetch data from
 * @returns
 * @see {@link https://swr.vercel.app}
 */
async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export { fetcher };
