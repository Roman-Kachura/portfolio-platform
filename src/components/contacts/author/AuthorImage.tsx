import React, { FC } from 'react';
import './author.scss';
import { DnDImage } from '../../commons/drop/DnDImage';

export const AuthorImage: FC<AuthorImageProps> = ({ isEdit, changeFileCallBack, image }) => {
  return (
    <>
      {isEdit && <DnDImage changeFileCallBack={changeFileCallBack} image={image}/>}
      {!isEdit && typeof image === 'string' && <div className='authorImage'><img src={image}/></div>}
    </>
  )
}

interface AuthorImageProps {
  image: null | ArrayBuffer | string
  isEdit: boolean
  changeFileCallBack: (image: null | ArrayBuffer | string, file: File | null) => void
}