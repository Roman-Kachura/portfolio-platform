import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSliceInitialState = {
  user: null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDTO>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

interface UserSliceInitialState {
  user: UserDTO | null
}

export interface UserDTO {
  id: string
  roles: string[]
}

export interface LoginResponse {
  user: UserDTO
  tokens: {
    access_token: string
    refresh_token: string
  }
}