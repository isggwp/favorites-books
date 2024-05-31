// usersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUsers, setStatus, setError } from "../slices/usersSlice";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setStatus('loading'));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
          dispatch(setStatus('succeeded'));
        } catch (error: any) {
          dispatch(setError(error.toString()));
          dispatch(setStatus('failed'));
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
