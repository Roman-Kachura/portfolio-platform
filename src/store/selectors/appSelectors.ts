import { RootState } from '../store';

export const getAppError = (state: RootState) => state.appReducer.error;
export const getSuccessMessage = (state: RootState) => state.appReducer.success;
export const getIsOpenModal = (state: RootState) => state.appReducer.isOpenModal;
export const getLoading = (state: RootState) => state.appReducer.loading;
