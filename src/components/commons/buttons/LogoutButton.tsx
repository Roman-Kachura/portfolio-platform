import {ButtonWithIcon} from './ButtonWithIcon';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {FC} from 'react';
import './buttons.scss';

export const LogoutButton:FC<LogoutButtonOff> = ({onClick}) => {
  return <ButtonWithIcon onClick={onClick} title="Выйти" icon={faPowerOff} className='logout'/>
}

interface LogoutButtonOff {
  onClick: () => void
}