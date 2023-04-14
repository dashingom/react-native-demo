import React, {PropsWithChildren} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import type {AppStore, RootState} from '../src/redux/store';

import {userApi} from '../src/redux/services/user';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        [userApi.reducerPath]: userApi.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
