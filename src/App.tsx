import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { SideBar } from './modules/sidebar/SideBar';
import { useAppSelector } from './store/store';
import { getAppError, getIsOpenModal, getLoading, getSuccessMessage } from './store/selectors/appSelectors';
import { ErrorAlert } from './components/commons/alerts/ErrorAlert';
import { getUser } from './store/selectors/userSelectors';
import { SuccessAlert } from './components/commons/alerts/SuccessAlert';
import { PageLoader } from './components/commons/loaders/PageLoader';
import './app.scss';

export const App: React.FC = () => {
  const user = useAppSelector(getUser);
  const error = useAppSelector(getAppError);
  const success = useAppSelector(getSuccessMessage);
  const isOpenModal = useAppSelector(getIsOpenModal);
  const loading = useAppSelector(getLoading);
  const finalClassName = !isOpenModal ? 'app' : `app openModal`;
  return (
    <div className={finalClassName}>
      {user && <SideBar/>}
      <div className={user ? 'appContainer' : 'appContainerWithoutPadding'}>
        <AppRoutes/>
      </div>
      {error && <ErrorAlert error={error}/>}
      {success && <SuccessAlert message={success}/>}
      {loading && <PageLoader/>}
    </div>
  )
}
