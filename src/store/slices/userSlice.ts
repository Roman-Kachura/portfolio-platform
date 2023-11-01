import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: UserSliceInitialState = {
  user: null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    }
  }
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;

interface UserSliceInitialState {
  user: IUser | null
}

export interface IUser {
  id: string
  roles: string[]
}

export interface LoginResponse {
  accessToken: string
  user: IUser
}