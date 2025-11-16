import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-rapidapi-key': '4da209fee6mshb61fe6ae5397323p143046jsnfb896a356aeb',
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



