import { Modal } from '../commons/modal/Modal';
import { DnDImage } from '../commons/drop/DnDImage';
import { Button } from '../commons/buttons/Button';
import React, { ChangeEvent, FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../commons/inputs/Input';

export const SkillItemModal: FC<SkillItemModalProps> = (
  { changeFileCallBack, submitCallBack, changeTitleCallBack, closeModalCallBack, image, title, children, disabled }
) => {

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => changeTitleCallBack(e.currentTarget.value);

  return (
    <Modal closeModal={closeModalCallBack}>
      <div className="skillModal">
        <DnDImage image={image} changeFileCallBack={changeFileCallBack}/>
        <Input value={title} onChange={changeTitleHandler} placeholder="Введите название"/>
        <Button title="ok" className="skillModalButton" onClick={submitCallBack} disabled={disabled}/>
        {children}
      </div>
    </Modal>
  )
}

interface SkillItemModalProps {
  title: string
  image: ArrayBuffer | string | null
  changeFileCallBack: (image: ArrayBuffer | string | null, file: File | null) => void
  changeTitleCallBack: (title: string) => void
  submitCallBack: () => void
  closeModalCallBack: () => void
  children?: ReactNode
  disabled?: boolean
}