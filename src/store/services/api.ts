import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { getAccessToken, getRefreshToken } from '../../helpers/tokenHelpers';
import { setError, setLoading } from '../slices/appSlice';
import { LoginResponse } from '../slices/userSlice';
import { Mutex } from 'async-mutex';


const mutex = new Mutex();
export const baseUrl = 'http://localhost:5000';
export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  api.dispatch(setLoading({ loading: true }));
  let result = await baseQuery(args, api, extraOptions);
  const error = checkErrors(result.error);
  if (error) {
    if (error.status === 401) {
      if (!mutex.isLocked()) {
        const refresh_token = getRefreshToken();
        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'POST', body: { refresh_token } },
          api,
          extraOptions,
        )
        if (refreshResult.data) {
          const data = refreshResult.data as LoginResponse;
          const access_token = data.tokens.access_token;
          const refresh_token = data.tokens.refresh_token;
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          console.log('refresh')
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setError({ error: 'Пользователь не авторизован!' }));
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions)
      }
    } else if (error.status === 403) api.dispatch(setError({ error: 'Нет доступа!' }));
    else { api.dispatch(setError({ error: error.message }))}
  }
  api.dispatch(setLoading({ loading: false }));
  return result;
}

function isErrorFetchBaseQuery(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    'status' in error &&
    typeof error.status === 'number'
  )
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  )
}

function checkErrors(error: unknown) {
  if (isErrorFetchBaseQuery(error) && isErrorWithMessage(error.data)) {
    return {
      message: error.data.message,
      status: error.status
    }
  }
  return null;
}



