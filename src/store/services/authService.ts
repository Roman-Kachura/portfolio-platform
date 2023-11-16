import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import { clearUser, LoginResponse, setUser } from '../slices/userSlice';
import { removeAccessToken, removeRefreshToken, saveAccessToken, saveRefreshToken } from '../../helpers/tokenHelpers';
import { removeUserFromStorage, saveUserToStorage } from '../../helpers/userHelpers';

export const authService = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, { email: string, password: string }>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(setUser(result.data.user));
          saveUserToStorage(result.data.user);
          saveAccessToken(result.data.tokens.access_token);
          saveRefreshToken(result.data.tokens.refresh_token);
        } catch (e) {
          console.error(e);
        }
      }
    }),
    logout: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `auth/logout/${id}`,
        method: 'delete'
      }),
      async onQueryStarted(arg, api) {
        try {
          await api.queryFulfilled;
          api.dispatch(clearUser());
          removeUserFromStorage();
          removeAccessToken();
          removeRefreshToken();
        } catch (e) {
          console.error(e)
        }
      }
    }),
    refresh: build.mutation<LoginResponse, { refresh_token: string }>({
      query: (body) => ({
        url: '/refresh',
        method: 'POST',
        body
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authService;