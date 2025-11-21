// src/services/cryptoNewsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-rapidapi-key': process.env.REACT_APP_CRYPTO_NEWS_KEY,
  'x-rapidapi-host': 'news-api14.p.rapidapi.com'
};

const baseUrl = 'https://news-api14.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) =>
        createRequest(
          `/v2/search/articles?query=${newsCategory}&language=en`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;




