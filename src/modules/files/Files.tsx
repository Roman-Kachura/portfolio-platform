import React, { FC } from 'react';
import { HeaderImageComponent } from '../../components/filies/HeaderImageComponent';
import { CVComponent } from '../../components/filies/CVComponent';
import { Title } from '../../components/commons/titles/Title';
import './files.scss';

export const Files: FC = () => {
  return (
    <div className="files">
      <Title title="Файлы"/>
      <div className="filesContent">
        <HeaderImageComponent/>
        <CVComponent/>
      </div>
    </div>
  )
}