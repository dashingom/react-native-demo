import {rest} from 'msw';
import {config} from '../../src/redux/app-config';
import {userMocks} from './userMocks';

export const handlers = [
  rest.get(`${config.apiUrl}/users`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json<User[]>(userMocks));
  }),
];
