import { DnDImage } from '../commons/drop/DnDImage';
import { Button } from '../commons/buttons/Button';
import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import { Modal } from '../commons/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Input } from '../commons/inputs/Input';

export const ProjectModal: FC<ProjectModalProps> = (
  {
    currentGithub,
    currentProjectLink,
    currentTitle,
    currentImage,
    submitCallBack,
    children,
  }
) => {
  const [image, setImage] = useState<null | ArrayBuffer | string>(currentImage || null);
  const [file, setFile] = useState<null | File>(null);
  const [title, setTitle] = useState(currentTitle || '');
  const [github, setGithub] = useState(currentGithub || '');
  const [projectLink, setProjectLink] = useState(currentProjectLink || '');
  const navigate = useNavigate();

  const navigateToProjects = () => navigate('/projects');
  const changeGithubLink = (e: ChangeEvent<HTMLInputElement>) => setGithub(e.currentTarget.value);
  const changeProjectLink = (e: ChangeEvent<HTMLInputElement>) => setProjectLink(e.currentTarget.value);
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const changeFileHandler = (image: null | ArrayBuffer | string, file: File | null) => {
    setImage(image);
    setFile(file);
  }
  const clearAllFields = () => {
    setFile(null);
    setImage(null);
    setTitle('');
    setGithub('');
    setProjectLink('');
  }
  const submitHandler = () => {
    if (file && title && github && projectLink) {
      const form = new FormData();
      form.append('image', file);
      form.append('name', title);
      form.append('github', github);
      form.append('url', projectLink);
      submitCallBack(form);
      clearAllFields();
      navigateToProjects();
    }
  }
  return (
    <Modal closeModal={navigateToProjects}>
      <div className="projectModal">
        <DnDImage image={image} changeFileCallBack={changeFileHandler}/>
        <Input value={title} onChange={changeTitle} placeholder="Введите заголовок"/>
        <Input value={github} onChange={changeGithubLink} placeholder="Введите гитхаб ссылку"/>
        <Input value={projectLink} onChange={changeProjectLink} placeholder="Введите ссылку проекта"/>
        <Button
          title="ok"
          className="projectModalButton"
          onClick={submitHandler}
          disabled={!(file && title && github && projectLink)}
        />
        <div onClick={navigateToProjects} className='projectChildrenBlock'>
          {children}
        </div>
      </div>
    </Modal>
  )
}

interface ProjectModalProps {
  currentTitle?: null | string
  currentGithub?: null | string
  currentProjectLink?: null | string
  currentImage?: ArrayBuffer | string | null
  submitCallBack: (form: FormData) => void
  children?: ReactNode
}