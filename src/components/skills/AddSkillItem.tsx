import React, { useEffect, useState } from 'react';
import { useCreateSkillMutation } from '../../store/services/skillService';
import './skillsComponents.scss';
import { SkillItemModal } from './SkillItemModal';
import { useNavigate } from 'react-router-dom';

export const AddSkillItem: React.FC = () => {
  const nav = useNavigate();
  const [createSkillMutationElement, { status, isSuccess }] = useCreateSkillMutation();
  const [image, setImage] = useState<null | ArrayBuffer | string>(null);
  const [file, setFile] = useState<null | File>(null);
  const [title, setTitle] = useState('');

  const closeModal = () => nav('/skills');
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
  const createSkill = () => {
    if (file && title) {
      const form = new FormData();
      form.append('image', file);
      form.append('title', title);
      createSkillMutationElement(form);
      clearAllFields();
    }
  }

  useEffect(() => {
    isSuccess && closeModal();
  }, [isSuccess])

  if(status === 'pending') return null;

  return <SkillItemModal
    closeModalCallBack={closeModal}
    image={image}
    title={title}
    changeFileCallBack={changeFileHandler}
    changeTitleCallBack={changeTitleHandler}
    submitCallBack={createSkill}
    disabled={!(title && file)}
  />
}