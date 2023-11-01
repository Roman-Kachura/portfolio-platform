import React, { ChangeEvent, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { SocialsItem } from './SocialsItem';
import { useCreateContactMutation, useGetContactsQuery } from '../../../store/services/contactsService';
import './socials.scss';
import { AppLink } from '../../commons/buttons/AppLink';

export const Socials: React.FC = () => {
  const { data: contacts } = useGetContactsQuery();
  const [createContactMutation] = useCreateContactMutation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [href, setHref] = useState('');

  const changeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const changeHref = (e: ChangeEvent<HTMLInputElement>) => setHref(e.currentTarget.value);
  const switchOffEditMode = () => setIsEditMode(false);
  const switchOnEditMode = () => setIsEditMode(true);
  const createContact = () => {
    if (name && href) {
      createContactMutation({ name, href });
      switchOffEditMode();
    }
  }
  return (
    <div className="socials">
      <h5>Социальные сети</h5>
      {contacts && contacts.map(c => <SocialsItem key={c._id} {...c}/>)}
      {
        isEditMode &&
        <>
          <input value={name} placeholder={'Name'} onChange={changeName}/>
          <input value={href} placeholder={'Link'} onChange={changeHref}/>
        </>
      }
      <AppLink to={'/contacts/new-social'} title='Добавить контакт' className='addLink'/>
    </div>
  )
}
