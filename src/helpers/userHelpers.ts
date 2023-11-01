import {IUser} from '../store/slices/userSlice';

export const saveUserToStorage = (user: IUser | null) => localStorage.setItem('user', JSON.stringify(user));
export const removeUserFromStorage = () => localStorage.removeItem('user');
export const loadUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};