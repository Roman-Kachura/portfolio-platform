import React from 'react';
import './buttons.scss';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ icon, className, onClick, ...props }) => {
  return (
    <button className={`deleteButton ${className}`} {...props} onClick={onClick}>
      <span>Удалить</span>
      {icon && <FontAwesomeIcon icon={faTrash}/>}
    </button>
  )
}