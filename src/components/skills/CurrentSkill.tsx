import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SkillItemModal } from './SkillItemModal';
import { useDeleteSkillMutation, useUpdateSkillMutation } from '../../store/services/skillService';
import { DeleteButton } from '../commons/buttons/DeleteButtonWithText';

export const CurrentSkill: FC<EditSkillItemInterface> = () => {
  const navigate = useNavigate();
  const [updateSkill, { status: updateStatus, isSuccess: updateSuccess }] = useUpdateSkillMutation();
  const [deleteSkill, { status: deleteStatus, isSuccess: deleteSuccess }] = useDeleteSkillMutation();
  const [params] = useSearchParams();
  const id = useParams().id;
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<null | ArrayBuffer | string>(null);
  const [file, setFile] = useState<null | File>(null);

  const closeModal = () => navigate('/skills');
  const changeFileHandler = (image: ArrayBuffer | string | null, file: File | null) => {
    setImage(image);
    setFile(file);
  }
  const changeTitleHandler = (title: string) => setTitle(title);
  const clearAllFields = () => {
    setFile(null);
    setImage(null);
    setTitle('');
  }
  const updateSkillHandler = () => {
    if (file && title && typeof image === 'string') {
      const form = new FormData();
      form.append('image', file);
      form.append('picture', image);
      form.append('title', title);
      updateSkill({ id, data: form });
      clearAllFields();
    }
  }
  const deleteSkillHandler = () => {
    if (id) {
      deleteSkill(id);
    }
  };

  useEffect(() => {
    const searchParamsTitle = params.get('title');
    const src = params.get('image');
    if (searchParamsTitle) setTitle(searchParamsTitle);
    if (src) setImage(src);
  }, [params])

  useEffect(() => {
    if(updateSuccess || deleteSuccess){
      closeModal();
    }
  }, [updateSuccess, deleteSuccess])

  if(updateStatus === 'pending' || deleteStatus === 'pending') return null;

  return (
    <SkillItemModal
      closeModalCallBack={closeModal}
      image={image}
      title={title}
      changeFileCallBack={changeFileHandler}
      changeTitleCallBack={changeTitleHandler}
      submitCallBack={updateSkillHandler}
      disabled={!(title && file)}
    >
      <DeleteButton icon onClick={deleteSkillHandler}/>
    </SkillItemModal>
  )
}

interface EditSkillItemInterface {

}