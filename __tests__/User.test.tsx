import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import User from '../src/components/User';
import {store} from '../src/redux/store';

describe('Todos', () => {
  test('User screen renders correctly', async () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Onkar')).toBeTruthy();
    });
  });
});
