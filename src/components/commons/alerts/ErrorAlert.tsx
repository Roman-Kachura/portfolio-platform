import { FC, useEffect } from 'react';
import './alerts.scss';
import { CloseButton } from '../buttons/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { useAppDispatch } from '../../../store/store';
import { setError } from '../../../store/slices/appSlice';

export const ErrorAlert: FC<{ error: string }> = ({ error }) => {
  const dispatch = useAppDispatch();
  const clearError = () => dispatch(setError({ error: null }));
  useEffect(() => {
      const timeoutId = setTimeout(clearError, 7000);
      return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="alert error">
      <CloseButton iconClassName="iconClassName" onClick={clearError}/>
      <div className="alertText">
        <FontAwesomeIcon icon={faTriangleExclamation} className="alertIcon"/>
        {error}
      </div>
    </div>
  )
}