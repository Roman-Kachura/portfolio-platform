import './loaders.scss';

export const PageLoader = () => {
  return (
    <div className='pageLoader'>
      <div className='pageLoaderContent'>
        <div className='circle'/>
        <div className='text'>Загрузка...</div>
      </div>
    </div>
  )
}