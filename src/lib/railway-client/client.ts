import { cacheExchange, Client, fetchExchange } from "urql";

export const client = (apiKey: string) => {
  return new Client({
    url: "https://backboard.railway.com/graphql/v2",
    exchanges: [cacheExchange, fetchExchange],
    fetch: (url, init) => {
      return fetch(url, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${apiKey}`,
          // railway seem to require a content-type set to json
          "Content-Type": "application/json",
        },
      });
    },
  });
};
