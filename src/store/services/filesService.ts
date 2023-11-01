import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './api';
import { setSuccessMessage } from '../slices/appSlice';

export const filesService = createApi({
  reducerPath: 'filesAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['cv', 'header', 'photo'],
  endpoints: (build) => ({
    getAuthorPhoto: build.query<{ name: string, url: string }, void>({
      query: () => ({
        url: 'files/image/photo'
      }),
      providesTags: ['photo']
    }),
    updateAuthorPhoto: build.mutation<void, FormData>({
      query: (data) => ({
        url: 'files/upload/image/photo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['photo'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Фото успешно обновлено!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    getHeaderImage: build.query<{ name: string, url: string }, void>({
      query: () => ({
        url: 'files/image/header',
      }),
      providesTags: ['header']
    }),
    changeHeaderImage: build.mutation<{}, FormData>({
      query: (data) => ({
        url: 'files/upload/image/header',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['header'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Изображение успешно изменено' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    getCV: build.query<any, void>({
      query: () => ({
        url: 'files/pdf/cv'
      }),
      providesTags: ['cv']
    }),
    changeCV: build.mutation<{}, FormData>({
      query: (data) => ({
        url: 'files/upload/pdf/cv',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['cv'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Резюме успешно изменено' }))
        } catch (e) {
          console.error(e)
        }
      }
    })
  })
});

export const {
  useGetAuthorPhotoQuery,
  useUpdateAuthorPhotoMutation,
  useGetHeaderImageQuery,
  useChangeCVMutation,
  useChangeHeaderImageMutation,
  useGetCVQuery
} = filesService;