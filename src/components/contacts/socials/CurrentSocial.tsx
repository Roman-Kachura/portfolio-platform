import { FC, useEffect, useState } from 'react';
import { Modal } from '../../commons/modal/Modal';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../../commons/buttons/Button';
import { useUpdateContactMutation } from '../../../store/services/contactsService';
import './socials.scss';
import { InputWithTitle } from '../../commons/inputs/InputWithTitle';

export const CurrentSocial: FC = () => {
  const [updateSocialContact, { isSuccess, status }] = useUpdateContactMutation();
  const id = useParams().id;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const title = params.get('title');
  const href = params.get('href');
  const [titleValue, setTitleValue] = useState('');
  const [hrefValue, setHrefValue] = useState('');

  const closeModal = () => navigate('/contacts')
  const changeTitleValue = (value: string) => setTitleValue(value);
  const changeHrefValue = (value: string) => setHrefValue(value);
  const updateContact = () => {
    if (id && titleValue && hrefValue) updateSocialContact({ _id: id, name: titleValue, href: hrefValue })
  }

  useEffect(() => {
    title && setTitleValue(title);
    href && setHrefValue(href);
  }, [title, href]);

  useEffect(() => {
    isSuccess && closeModal();
  }, [isSuccess])

  if (status === 'pending') return null;

  return (
    <Modal closeModal={closeModal}>
      <div className="currentSocial">
        <InputWithTitle title="Заголовок:" value={titleValue} changeHandler={changeTitleValue}/>
        <InputWithTitle title="Ссылка:" value={hrefValue} changeHandler={changeHrefValue}/>
        <Button title={'Сохранить'} className="currentSocialButton" onClick={updateContact}/>
      </div>
    </Modal>
  )
}