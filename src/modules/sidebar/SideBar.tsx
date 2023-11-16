import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Menu } from './Menu';
import { useAppSelector } from '../../store/store';
import './sideBar.scss';
import { LogoutButton } from '../../components/commons/buttons/LogoutButton';
import { useLogoutMutation } from '../../store/services/authService';
import { getUser } from '../../store/selectors/userSelectors';

export const SideBar: React.FC = () => {
  const user = useAppSelector(getUser);
  const [logoutMutation] = useLogoutMutation();
  const logout = () => user && logoutMutation({id:user.id});
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