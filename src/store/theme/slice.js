import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state,{payload}) {
      state.isDarkTheme = payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer
