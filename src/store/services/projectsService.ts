import {createApi} from '@reduxjs/toolkit/query/react';
import {IProject} from '../../models/IProject';
import {baseQueryWithReauth} from './api';
import { setSuccessMessage } from '../slices/appSlice';

export const projectsService = createApi({
  reducerPath: 'projectsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['projects'],
  endpoints: (build) => ({
    getAllProject: build.query<IProject[], void>({
      query: () => ({
        url: 'projects/'
      }),
      providesTags: ['projects']
    }),
    createProject: build.mutation<void, FormData>({
      query: (data) => ({
        url: 'projects/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['projects'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Проект успешно создан!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    deleteProject: build.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['projects'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Проект успешно удалён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    updateProject: build.mutation<void, { form: FormData, id: string }>({
      query: (data) => ({
        url: `projects/${data.id}`,
        method: 'PUT',
        body: data.form
      }),
      invalidatesTags: ['projects'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setSuccessMessage({ message: 'Проект успешно обновлён!' }))
        } catch (e) {
          console.error(e)
        }
      }
    })
  })
});

export const {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectsService;