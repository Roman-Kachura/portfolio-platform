import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {skillService} from './services/skillService';
import {filesService} from './services/filesService';
import {projectsService} from './services/projectsService';
import {contactsService} from './services/contactsService';
import {authorService} from './services/authorService';
import {authService} from './services/authService';
import userSlice from './slices/userSlice';
import appSlice from './slices/appSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {loadUserFromStorage} from '../helpers/userHelpers';

const rootReducer = combineReducers({
  [authorService.reducerPath]: authorService.reducer,
  [skillService.reducerPath]: skillService.reducer,
  [filesService.reducerPath]: filesService.reducer,
  [projectsService.reducerPath]: projectsService.reducer,
  [contactsService.reducerPath]: contactsService.reducer,
  [authService.reducerPath]: authService.reducer,
  userReducer: userSlice,
  appReducer: appSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(
          skillService.middleware,
          filesService.middleware,
          projectsService.middleware,
          contactsService.middleware,
          authorService.middleware,
          authService.middleware
        ),
    preloadedState: {
      userReducer: {user: loadUserFromStorage()}
    }
  })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;