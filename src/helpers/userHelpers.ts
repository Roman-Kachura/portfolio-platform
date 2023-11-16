import {UserDTO} from '../store/slices/userSlice';

export const saveUserToStorage = (user: UserDTO | null) => localStorage.setItem('user', JSON.stringify(user));
export const removeUserFromStorage = () => localStorage.removeItem('user');
export const loadUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};