import React from 'react';
import { Contacts } from '../modules/contacts/Contacts';
import { Outlet } from 'react-router-dom';

export const ContactsPage = () => {

  return (
    <>
      <Contacts/>
      <Outlet/>
    </>
  )
}