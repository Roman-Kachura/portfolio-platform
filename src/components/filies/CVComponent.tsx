import React, { ChangeEvent, useState } from 'react';
import { useChangeCVMutation, useGetCVQuery } from '../../store/services/filesService';
import { downloadFile } from '../../hooks/downloadFile';
import { LinkWithIcon } from '../commons/buttons/LinkWithIcon';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../commons/buttons/Button';
import './filesComponents.scss';

export const CVComponent = () => {
  const { data: cv, isFetching, error } = useGetCVQuery();
  const [CVFile, setCVFile] = useState<null | File>(null);
  const [changeCV] = useChangeCVMutation();

  const changeCVFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await downloadFile(e.currentTarget.files);
    setCVFile(result.file);
  };

  const saveCV = () => {
    if (CVFile) {
      const data = new FormData();
      data.append('file', CVFile);
      changeCV(data);
      setCVFile(null);
    }
  }


  return (
    <div className='cvContainer'>
      <h3>Резюме</h3>
      {
        !isFetching &&
        <>
          <LinkWithIcon
            title="Смотреть резюме"
            icon={faFilePdf} to={cv.url}
            target="_blank"
            className='cvLink'
            iconClassName='cvIcon'
          />
          <input type="file" onChange={changeCVFile} accept="application/pdf"/>
        </>
      }

      <Button onClick={saveCV} disabled={!CVFile} title="сохранить резюме"/>
    </div>
  )
}