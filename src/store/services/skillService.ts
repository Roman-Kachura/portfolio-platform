import {createApi} from '@reduxjs/toolkit/query/react';
import {ISkill} from '../../models/ISkill';
import {baseQueryWithReauth} from './api';
import { setSuccessMessage } from '../slices/appSlice';

export const skillService = createApi({
  reducerPath: 'skillAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Skills'],
  endpoints: (build) => ({
    fetchAllSkills: build.query<ISkill[], {}>({
      query: () => ({
        url: 'skills/',
      }),
      providesTags: result => ['Skills']
    }),
    createSkill: build.mutation<FormData, {}>({
      query: (data) => ({
        url: 'skills/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Skills'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Навык успешно создан!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    updateSkill: build.mutation<{ id: string, data: FormData }, {}>({
      query: (arg: { id: string, data: FormData }) => ({
        url: `skills/${arg.id}`,
        method: 'PUT',
        body: arg.data,
      }),
      invalidatesTags: ['Skills'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Навык успешно обновлён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    deleteSkill: build.mutation<string, {}>({
      query: (id) => ({
        url: `skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skills'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Навык успешно удалён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
  })
});

export const {
  useFetchAllSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation
} = skillService;