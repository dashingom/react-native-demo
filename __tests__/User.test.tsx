import React from 'react';
import {screen, waitFor} from '@testing-library/react-native';
import User from '../src/screens/User';
import {server} from '../test/server';
import {rest} from 'msw';
import {config} from '../src/redux/app-config';
import {renderWithProviders} from '../test/testUtils';

describe('Todos', () => {
  // test('User screen renders correctly', async () => {
  //   renderWithProviders(<User />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Onkar')).toBeTruthy();
  //   });
  // });

  test('displays a error', async () => {
    const loadingMessage = 'an error has occurred';
    // force msw to return error response
    server.use(
      rest.get(`${config.apiUrl}/users`, (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json('an error has occurred'));
      }),
    );
    renderWithProviders(<User />);
    await waitFor(() => {
      expect(screen.queryByText(loadingMessage)).toBeTruthy();
    });
  });
});
