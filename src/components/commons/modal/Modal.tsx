import { FC, ReactNode, useEffect, useState } from 'react';
import { CloseButton } from '../buttons/CloseButton';
import { useAppDispatch } from '../../../store/store';
import { setOpenModal } from '../../../store/slices/appSlice';
import './modal.scss';

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
    closeModal();
  }
  useEffect(() => {
    dispatch(setOpenModal({ isOpen }));
    return () => {
      dispatch(setOpenModal({ isOpen: false }))
    }
  }, [isOpen])
  return (
    <div className="modal" onClick={closeHandler}>
      <CloseButton className="modalCloseButton" onClick={closeModal}/>
      <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

interface ModalProps {
  closeModal: () => void
  children: ReactNode
}