import { FC, useEffect } from 'react';
import './alerts.scss';
import { CloseButton } from '../buttons/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../../store/store';
import { setSuccessMessage } from '../../../store/slices/appSlice';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

export const SuccessAlert: FC<{ message: string }> = ({ message }) => {
  const dispatch = useAppDispatch();
  const clearSuccessMessage = () => dispatch(setSuccessMessage({ message: null }));
  useEffect(() => {
    const timeoutId = setTimeout(clearSuccessMessage, 7000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="alert success">
      <CloseButton iconClassName="iconClassName" onClick={clearSuccessMessage}/>
      <div className="alertText">
        <FontAwesomeIcon icon={faCheck} className="alertIcon"/>
        {message}
      </div>
    </div>
  )
}