import {api} from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => {
        return {
          url: '/users',
        };
      },
    }),
  }),
});

export const {useGetUsersQuery} = userApi;
