import './notFound.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

export const NotFoundComponent = () => {
  return(
    <div className='notFoundComponent'>
      <FontAwesomeIcon className='notFoundIcon' icon={faFaceSadTear}/>
      <div>Page is not found</div>
    </div>
  )
}