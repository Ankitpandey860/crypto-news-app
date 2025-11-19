import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-key': '4da209fee6mshb61fe6ae5397323p143046jsnfb896a356aeb',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({

    // ----------------------------------
    //  BASIC ENDPOINTS (JS mastery used)
    // ----------------------------------

    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),

    // ----------------------------------
    //      ADVANCED PRO ENDPOINTS
    // ----------------------------------

    // 🔥 Trending coins
    getTrendingCoins: builder.query({
      query: () => createRequest(`/coins/trending`),
    }),

    // 🔥 Top gainers & losers
    getTopGainersLosers: builder.query({
      query: () => createRequest(`/coins/gainers-and-losers`),
    }),

    // 🔥 OHLC (Candlestick data)
    getCoinOHLC: builder.query({
      query: ({ coinId, interval }) =>
        createRequest(`/coin/${coinId}/ohlc?interval=${interval}`),
    }),

    // 🔥 Market pairs (BTC/USDT etc.)
    getCoinMarkets: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}/markets`),
    }),

    // 🔥 Exchanges List
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),

    // 🔥 Single Exchange info
    getExchangeDetails: builder.query({
      query: (exchangeId) => createRequest(`/exchange/${exchangeId}`),
    }),

    // 🔥 Exchange market pairs
    getExchangeMarkets: builder.query({
      query: (exchangeId) =>
        createRequest(`/exchange/${exchangeId}/markets`),
    }),

    // 🔥 Search suggestions
    getSearchSuggestions: builder.query({
      query: (query) => createRequest(`/search-suggestions?query=${query}`),
    }),

    // 🔥 Global stats (advanced)
    getGlobalStats: builder.query({
      query: () => createRequest(`/stats`),
    }),

    // 🔥 Global market cap history
    getMarketCapHistory: builder.query({
      query: () => createRequest(`/global-market-cap-history`),
    }),

    // 🔥 Global trading volume history
    getVolumeHistory: builder.query({
      query: () => createRequest(`/global-trading-volume-history`),
    }),

    // 🔥 Bitcoin dominance chart
    getBitcoinDominance: builder.query({
      query: () => createRequest(`/bitcoin-dominance-history`),
    }),

  }),
});

// Export all hooks
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetTrendingCoinsQuery,
  useGetTopGainersLosersQuery,
  useGetCoinOHLCQuery,
  useGetCoinMarketsQuery,
  useGetExchangesQuery,
  useGetExchangeDetailsQuery,
  useGetExchangeMarketsQuery,
  useGetSearchSuggestionsQuery,
  useGetGlobalStatsQuery,
  useGetMarketCapHistoryQuery,
  useGetVolumeHistoryQuery,
  useGetBitcoinDominanceQuery,
} = cryptoApi;



