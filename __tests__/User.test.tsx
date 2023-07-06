import React from 'react';
import {screen, waitFor} from '@testing-library/react-native';
import User from '../src/screens/User';
import {server} from '../test/server';
import {rest} from 'msw';
import {config} from '../src/redux/app-config';
import {renderWithProviders} from '../test/testUtils';

describe('Todos', () => {
  test('User screen renders correctly', async () => {
    renderWithProviders(<User />);

    await waitFor(() => {
      expect(screen.getByText('Onkar')).toBeTruthy();
    });
  });

  test('renders no users message when API returns 0 results', async () => {
    server.use(rest.get(`${config.apiUrl}/users`, (_req, res, ctx) => res(ctx.json([]))));

    renderWithProviders(<User />);

    await waitFor(() => {
      expect(screen.getByText('There are no users')).toBeTruthy();
    });
  });

  test('displays a error', async () => {
    const errorMsg = 'an error has occurred';
    // force msw to return error response
    server.use(
      rest.get(`${config.apiUrl}/users`, (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMsg}));
      }),
    );

    renderWithProviders(<User />);

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeTruthy();
    });
  });
});
