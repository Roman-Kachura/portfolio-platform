import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { getToken } from '../../helpers/tokenHelpers';
import { setError, setLoading } from '../slices/appSlice';


export const baseUrl = 'http://localhost:5000';
export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = getToken();
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
  api.dispatch(setLoading({ loading: true }));
  const result = await baseQuery(args, api, extraOptions);
  const error = checkErrors(result.error);
  if (error) {
    if (error.status === 401) api.dispatch(setError({ error: 'Пользователь не авторизован!' }))
    else if (error.status === 403) api.dispatch(setError({ error: 'Нет доступа!' }))
    else {
      api.dispatch(setError({ error: error.message }))
    }
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



