import React from 'react';
import './buttons.scss';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: IconProp
}

export const ButtonWithIcon: React.FC<ButtonProps> = ({title, onClick, icon, className, ...props}) => {
  return (
    <button className={`buttonWithIcon ${className}`} {...props} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="icon"/>
      <span className="buttonText">{title}</span>
    </button>
  )
}