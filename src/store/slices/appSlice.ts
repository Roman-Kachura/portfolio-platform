import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppSliceInitialState = {
  loading:false,
  error: null,
  success: null,
  isOpenModal: false
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setSuccessMessage(state, action: PayloadAction<{ message: string | null }>) {
      state.success = action.payload.message;
    },
    setOpenModal(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isOpenModal = action.payload.isOpen;
    },
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading;
    }
  }
});

export const { setError, setOpenModal, setSuccessMessage,setLoading } = appSlice.actions;

export default appSlice.reducer;

interface AppSliceInitialState {
  loading:boolean
  error: null | string
  success: null | string
  isOpenModal: boolean
}