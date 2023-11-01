import './contacts.scss';
import React, { FC } from 'react';
import { Title } from '../../components/commons/titles/Title';
import { AuthorInfo } from '../../components/contacts/author/AuthorInfo';
import { Socials } from '../../components/contacts/socials/Socials';

export const Contacts:FC = () => {
  return(
    <div className='contacts'>
      <Title title="Контакты"/>
      <div className='contactsContent'>
        <AuthorInfo/>
        <Socials/>
      </div>
    </div>
  )
}