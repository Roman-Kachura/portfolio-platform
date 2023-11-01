import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import { clearUser, LoginResponse, setUser } from '../slices/userSlice';
import { removeToken, saveToke } from '../../helpers/tokenHelpers';
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
          saveToke(result.data.accessToken);
        } catch (e) {
          console.error(e)
        }
      }
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'delete'
      }),
      async onQueryStarted(arg, api) {
        try {
          await api.queryFulfilled;
          api.dispatch(clearUser());
          removeUserFromStorage();
          removeToken();
        } catch (e) {
          console.error(e)
        }
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authService;