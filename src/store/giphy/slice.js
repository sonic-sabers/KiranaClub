import {createSlice} from '@reduxjs/toolkit';
import {
  getTrendingGif,
  getExtraTrendingGif,
  getSearchedTrendingGif,
  getSearchedExtraTrendingGif,
} from './thunk';

const initialState = {
  trendingGif: [],
  trendingGifLoading: false,
  trendingGifOffset: 0,
  trendingExtraGifLoading: false,

  searchedGif: [],
  searchedGifLoading: false,
  searchedGifOffset: 0,
  searchedExtraGifLoading: false,

  error: '',
};

const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {
    removeSearchedResult(state) {
      state.searchedGif = [];
    },
    removeError(state) {
      state.error = '';
    },
    toggleGifPlaying(state, {payload}) {
      const {id, play, from} = payload;
      if (from === 'trending') {
        const index = state.trendingGif.findIndex(item => item.id == id);
        if (index !== -1) {
          state.trendingGif[index].isPlaying = play;
        }
      }
      if (from === 'search') {
        const index = state.searchedGif.findIndex(item => item.id == id);
        if (index !== -1) {
          state.searchedGif[index].isPlaying = play;
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getTrendingGif.pending, (state, {payload}) => {
      state.trendingGifLoading = true;
    }),
      builder.addCase(getTrendingGif.fulfilled, (state, {payload}) => {
        const payload1 = payload.map(item => {
          return {...item, isPlaying: false};
        });
        state.trendingGif = payload1;
        state.trendingGifLoading = false;
      }),
      builder.addCase(getTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.trendingGifLoading = false;
      });

    builder.addCase(getExtraTrendingGif.pending, (state, {payload}) => {
      state.trendingExtraGifLoading = true;
    }),
      builder.addCase(getExtraTrendingGif.fulfilled, (state, {payload}) => {
        const payload1 = payload.data.map(item => {
          return {...item, isPlaying: false};
        });
        state.trendingGif = state.trendingGif.concat(payload1);
        state.trendingGifOffset = payload.offset;
        state.trendingExtraGifLoading = false;
      }),
      builder.addCase(getExtraTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.trendingExtraGifLoading = false;
      });

    builder.addCase(getSearchedTrendingGif.pending, (state, {payload}) => {
      state.searchedGifLoading = true;
    }),
      builder.addCase(getSearchedTrendingGif.fulfilled, (state, {payload}) => {
        if (payload.length == 0) {
          state.error = 'No such Gifs were found';
        }
        const payload1 = payload.map(item => {
          return {...item, isPlaying: false};
        });
        state.searchedGif = payload1;
        state.searchedGifLoading = false;
      }),
      builder.addCase(getSearchedTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.searchedGifLoading = false;
      });

    builder.addCase(getSearchedExtraTrendingGif.pending, (state, {payload}) => {
      state.searchedExtraGifLoading = true;
    }),
      builder.addCase(
        getSearchedExtraTrendingGif.fulfilled,
        (state, {payload}) => {
          const payload1 = payload.data.map(item => {
            return {...item, isPlaying: false};
          });
          state.searchedGif = state.searchedGif.concat(payload1);
          state.searchedGifOffset = payload.offset;
          state.searchedExtraGifLoading = false;
        },
      ),
      builder.addCase(
        getSearchedExtraTrendingGif.rejected,
        (state, {payload}) => {
          state.error = payload;
          state.searchedExtraGifLoading = false;
        },
      );
  },
});

export const {removeSearchedResult, removeError, toggleGifPlaying} =
  giphySlice.actions;

export default giphySlice.reducer;
