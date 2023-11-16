import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import { IAuthor } from '../../models/IAuthor';

export const authorService = createApi({
  reducerPath: 'authorApi',
  tagTypes: ['author'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAuthor: build.query<IAuthor, void>({
      query: () => ({
        url: '/author'
      }),
      providesTags: ['author']
    }),
    updateAuthor: build.mutation<void, IAuthor>({
      query: (body) => ({
        url: '/author',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['author']
    })
  })
});

export const { useGetAuthorQuery, useUpdateAuthorMutation } = authorService;