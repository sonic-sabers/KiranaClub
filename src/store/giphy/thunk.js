import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import axios from 'axios';
import { throttle } from 'lodash';

const THROTTLE_DELAY = 300;
const THROTTLE_LIMIT = 1;

export const getTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/gifs/trending',
  (payload, { dispatch, getState }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          giphy: { trendingGifOffset },
        } = getState();
        const res = await axios.get(Config.GIPHY_TRENDING_API, {
          params: {
            offset: trendingGifOffset,
            api_key: Config.TRENDING_API_KEY,
            limit: 20,
          },
        });
        resolve(res.data.data);
      } catch (err) {
        reject(err);
      }
    });
  },
);

export const getExtraTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/gifs/trending/extra',
  (payload, { dispatch, getState }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          giphy: { trendingGifOffset },
        } = getState();
        const offsetIndex = trendingGifOffset + 10;
        const res = await axios.get(Config.GIPHY_TRENDING_API, {
          params: {
            api_key: Config.TRENDING_API_KEY,
            offset: offsetIndex,
            limit: 20,
          },
        });
        resolve({ data: res.data.data, offset: offsetIndex });
      } catch (err) {
        reject(err);
      }
    });
  },
);

export const getSearchedTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/stickers/search',
  throttle(
    (payload, { dispatch, getState }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            giphy: { trendingGifOffset },
          } = getState();

          const { q } = payload;
          const res = await axios.get(Config.GIPHY_SEARCH_API, {
            params: {
              api_key: Config.SEARCH_API_KEY,
              offset: trendingGifOffset,
              limit: 10,
              q,
            },
          });
          resolve(res.data.data);
        } catch (err) {
          reject(err);
        }
      });
    },
    THROTTLE_DELAY,
    {
      leading: true,
      trailing: true,
      leadingDelay: 0,
      trailingLimit: THROTTLE_LIMIT,
    },
  ),
);

export const getSearchedExtraTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/stickers/search/extra',
  (payload, { dispatch, getState }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          giphy: { searchedGifOffset },
        } = getState();

        const offsetIndex = searchedGifOffset + 10;
        const { q } = payload;
        const res = await axios.get(Config.GIPHY_SEARCH_API, {
          params: {
            api_key: Config.SEARCH_API_KEY,
            offset: offsetIndex,
            limit: 10,
            q,
          },
        });
        resolve({ data: res.data.data, offset: offsetIndex });
      } catch (err) {
        reject(err);
      }
    });
  },
);
