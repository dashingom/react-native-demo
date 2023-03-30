import {rest} from 'msw';
import {userMocks} from './userMocks';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) =>
    res(ctx.status(200), ctx.json<User[]>(userMocks)),
  ),
];
