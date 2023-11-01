import React, { useEffect, useState } from 'react';
import { useChangeHeaderImageMutation, useGetHeaderImageQuery } from '../../store/services/filesService';
import { DnDImage } from '../commons/drop/DnDImage';
import './filesComponents.scss';
import { Button } from '../commons/buttons/Button';
import { NavLink } from 'react-router-dom';

export const HeaderImageComponent = () => {
  const { data: header, isFetching } = useGetHeaderImageQuery()
  const [changeHeader] = useChangeHeaderImageMutation();
  const [headerImageFile, setHeaderImageFile] = useState<null | File>(null);
  const [headerImage, setHeaderImage] = useState<null | ArrayBuffer | string>('');

  const changeHeaderImage = (image: null | ArrayBuffer | string, file: File | null) => {
    setHeaderImageFile(file);
    setHeaderImage(image);
  };

  const saveHeaderImage = () => {
    if (headerImageFile) {
      const data = new FormData();
      data.append('image', headerImageFile);
      changeHeader(data);
      setHeaderImageFile(null);
    }
  }
  useEffect(() => {
    header && setHeaderImage(header.url);
  }, [header]);

  return (
    <div className="headerImageBlock">
      <h3>Изображение хэдера</h3>
      {!isFetching && <DnDImage changeFileCallBack={changeHeaderImage} image={headerImage} className="headerImage"/>}
      {header && <NavLink target="_blank" to={header.url}>Текущее изображение</NavLink>}
      <Button
        title="Сохранить изображение"
        className="saveHeaderButton"
        onClick={saveHeaderImage}
        disabled={!headerImageFile}
      />
    </div>
  )
}