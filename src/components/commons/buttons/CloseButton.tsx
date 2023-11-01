import React from 'react';
import './buttons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconClassName?: string
}

export const CloseButton: React.FC<CloseButtonProps> = ({ iconClassName, className, ...props }) => {
  return (
    <button title="Закрыть" className={`alertCloseButton ${className}`} {...props}>
      <FontAwesomeIcon icon={faXmark} className={`icon ${iconClassName}`}/>
    </button>
  )
}