import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Menu } from './Menu';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './sideBar.scss';
import { LogoutButton } from '../../components/commons/buttons/LogoutButton';
import { useLogoutMutation } from '../../store/services/authService';

export const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer.user);
  const [logoutMutation] = useLogoutMutation();
  // const logout = () => dispatch(clearUser());
  const logout = () => logoutMutation();
  return (
    <header className='header'>
        {user && <Menu/>}
        {user
          ? <LogoutButton onClick={logout}/>
          : <NavLink className="link-warning">Войти</NavLink>
        }
    </header>
  )
}