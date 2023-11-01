import { Modal } from '../../commons/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../commons/buttons/Button';
import { useEffect, useState } from 'react';
import { useCreateContactMutation } from '../../../store/services/contactsService';
import { InputWithTitle } from '../../commons/inputs/InputWithTitle';

export const NewSocial = () => {
  const [createContactMutation, { isSuccess, status }] = useCreateContactMutation();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [href, setHref] = useState('');
  const closeModal = () => nav('/contacts');
  const changeTitleValue = (value: string) => setName(value);
  const changeHrefValue = (value: string) => setHref(value);
  const createContact = () => {
    if (name && href) createContactMutation({ name, href });
  }

  useEffect(() => {
    isSuccess && closeModal();
  }, [isSuccess])

  if (status === 'pending') return null;

  return (
    <Modal closeModal={closeModal}>
      <div className="currentSocial">
        <InputWithTitle title="Заголовок:" value={name} changeHandler={changeTitleValue}/>
        <InputWithTitle title="Ссылка:" value={href} changeHandler={changeHrefValue}/>
        <Button title={'Создать контакт'} className="currentSocialButton" onClick={createContact}/>
      </div>
    </Modal>
  )
}