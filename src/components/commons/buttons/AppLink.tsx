import React from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';
import './buttons.scss';

interface AppLink extends NavLinkProps{

}

export const AppLink: React.FC<AppLink> = ({title, className,to, style,...props}) => {
  return <NavLink to={to} className={`button ${className}`} {...props}>{title}</NavLink>
}