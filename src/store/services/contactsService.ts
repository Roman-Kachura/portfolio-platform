import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import { IContact } from '../../models/IContact';
import { setSuccessMessage } from '../slices/appSlice';

export const contactsService = createApi({
  reducerPath: 'contactsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['contacts'],
  endpoints: (build) => ({
    getContacts: build.query<IContact[], void>({
      query: () => ({
        url: 'contacts'
      }),
      providesTags: ['contacts']
    }),
    createContact: build.mutation<void, { name: string, href: string }>({
      query: (data) => ({
        url: 'contacts',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['contacts'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Контакт успешно создан!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    updateContact: build.mutation<void, IContact>({
      query: (data) => {
        return {
          url: `contacts/${data._id}`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['contacts'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Контакт успешно обновлён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    deleteContact: build.mutation<void, { id: string }>({
      query: (data) => ({
        url: `contacts/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Контакт успешно удалён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
  })
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactsService;