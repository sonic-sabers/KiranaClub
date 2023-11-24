import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import giphyReducer from './giphy/slice';

import themeReducer from './theme/slice';

const rootReducer = combineReducers({
  giphy: giphyReducer,
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: false,
});

export default store;
