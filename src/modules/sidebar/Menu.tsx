import React, {FC} from 'react';
import './sideBar.scss'
import {faAddressCard, faFileSignature, faGraduationCap, faSuitcase} from '@fortawesome/free-solid-svg-icons';
import {LinkWithIcon} from '../../components/commons/buttons/LinkWithIcon';

export const Menu: FC = () => {
  return (
    <nav className="nav">
      <LinkWithIcon icon={faGraduationCap} to='/skills' title='Навыки'/>
      <LinkWithIcon icon={faFileSignature} to='/files' title='Файлы'/>
      <LinkWithIcon icon={faSuitcase} to='/projects' title='Проекты'/>
      <LinkWithIcon icon={faAddressCard} to='/contacts' title='Контакты'/>
    </nav>
  )
}

