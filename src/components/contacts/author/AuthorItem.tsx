import { ChangeEvent, FC } from 'react';
import './author.scss';
import { Input } from '../../commons/inputs/Input';

export const AuthorItem: FC<AuthorItemProps> = ({value, callBack, isEdit, placeholder}) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => callBack(e.currentTarget.value);
  return (
    <div className='authorItem'>
      {isEdit ? <Input value={value} onChange={changeHandler} placeholder={placeholder}/> : <h6>{value}</h6>}
    </div>
  )
}

interface AuthorItemProps {
  value: string
  callBack: (value: string) => void
  isEdit: boolean
  placeholder?: string
}