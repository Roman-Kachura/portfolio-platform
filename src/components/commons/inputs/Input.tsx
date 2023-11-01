import React, { FC } from 'react';
import './inputs.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

export const Input: FC<InputProps> = ({ value, className, onChange, placeholder, ...props }) => {
  const finalClassName = !className ? 'input' : `input ${className}`;
  return <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={finalClassName}
    {...props}
  />
}