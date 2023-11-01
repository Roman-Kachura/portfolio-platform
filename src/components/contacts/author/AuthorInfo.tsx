import { NavLink } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AuthorItem } from './AuthorItem';
import { AuthorImage } from './AuthorImage';
import { useGetAuthorPhotoQuery, useUpdateAuthorPhotoMutation } from '../../../store/services/filesService';
import { useGetAuthorQuery } from '../../../store/services/authorService';
import './author.scss';
import { Button } from '../../commons/buttons/Button';
import { Input } from '../../commons/inputs/Input';

export const AuthorInfo = () => {
  const { data: authorInfo } = useGetAuthorQuery();
  const { data: photo} = useGetAuthorPhotoQuery();
  const [updateAuthorPhotoMutation] = useUpdateAuthorPhotoMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<null | ArrayBuffer | string>(null);
  const [file, setFile] = useState<null | File>(null);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationUrl, setLocationUrl] = useState('');


  const clearImage = () => {
    setFile(null);
    setImage(null);
  }
  const changeName = (value: string) => setName(value);
  const changeMail = (value: string) => setMail(value);
  const changePhone = (value: string) => setPhone(value);
  const changeLocationName = (value: string) => setLocationName(value);
  const changeLocationUrl = (e: ChangeEvent<HTMLInputElement>) => setLocationUrl(e.currentTarget.value);
  const turnOnEditMode = () => setIsEdit(true);
  const turnOffEditMode = () => setIsEdit(false);
  const changeFileHandler = (image: null | ArrayBuffer | string, file: File | null) => {
    setImage(image);
    setFile(file);
  };
  const saveChanges = () => {
    if (file) {
      const form = new FormData();
      form.append('image', file);
      updateAuthorPhotoMutation(form);
      clearImage();
    }
    turnOffEditMode();
  };

  useEffect(() => {
    if (authorInfo) {
      setName(authorInfo.name);
      setMail(authorInfo.email);
      setPhone(authorInfo.phone);
      setLocationName(authorInfo.location.name);
      setLocationUrl(authorInfo.location.url);
    }
  }, [authorInfo])

  useEffect(() => {
    photo && setImage(photo.url)
  }, [photo])

  return (
    <div className="author">
      <AuthorImage isEdit={isEdit} changeFileCallBack={changeFileHandler} image={image}/>
      <div className='authorFields'>
        <AuthorItem value={name} callBack={changeName} isEdit={isEdit} placeholder={'Name'}/>
        <AuthorItem value={mail} callBack={changeMail} isEdit={isEdit} placeholder={'Mail'}/>
        <AuthorItem value={phone} callBack={changePhone} isEdit={isEdit} placeholder={'Phone'}/>
        <AuthorItem value={locationName} callBack={changeLocationName} isEdit={isEdit} placeholder={'Location name'}/>
        <div className='authorItem'>
          {!isEdit
            ? <NavLink
              target="_blank"
              to={locationUrl}
            >
              Смотреть на карте
            </NavLink>
            : <Input value={locationUrl} onChange={changeLocationUrl} placeholder={'Location link'}/>
          }
        </div>
      </div>
      <div className='authorButtons'>
        {!isEdit && <Button className='authorButton' title='изменить' onClick={turnOnEditMode}/>}
        {isEdit && <Button className='authorButton' title='сохранить' onClick={saveChanges}/>}
      </div>
    </div>
  )
}