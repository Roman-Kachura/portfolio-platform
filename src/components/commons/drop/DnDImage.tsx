import React, { ChangeEvent, FC } from 'react';
import './dnd.scss';
import { downloadFile } from '../../../hooks/downloadFile';

export const DnDImage: FC<DnDImageProps> = ({ changeFileCallBack, image, className }) => {
  const changeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await downloadFile(e.target.files);
    changeFileCallBack(result.image, result.file)
  }
  const finalClassName = !className ? 'dnd' : `dnd ${className}`;
  return (
    <div className={finalClassName}>
      {image && typeof image === 'string' && <img src={image}/>}
      {!image && <div className="empty">Нажмите или перетащите файл</div>}
      <input
        type="file"
        onChange={changeFileHandler}
        accept="image/*"
        className="dndInput"
        multiple={false}
      />
    </div>
  )
}

interface DnDImageProps {
  className?: string
  changeFileCallBack: (image: null | ArrayBuffer | string, file: File | null) => void
  image: null | ArrayBuffer | string
}