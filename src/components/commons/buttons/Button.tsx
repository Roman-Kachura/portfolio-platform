import React from 'react';
import './buttons.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, className, onClick, type, ...props }) => {
  return <button type={type} className={`button ${className}`} {...props} onClick={onClick}>{title}</button>
}