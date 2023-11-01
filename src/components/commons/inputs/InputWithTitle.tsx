import { ChangeEvent, FC } from 'react';
import './inputs.scss';
import { Input } from './Input';

export const InputWithTitle: FC<InputWithTitleProps> = ({ title, className, changeHandler, value }) => {
  const finalClassName = !className ? 'inputWithTitle' : `inputWithTitle ${className}`;
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => changeHandler(e.currentTarget.value);

  return (
    <div className={finalClassName}>
      <h5>{title}</h5>
      <Input value={value} onChange={handleChange} className="itemInput"/>
    </div>
  )
}

interface InputWithTitleProps {
  title: string
  value: string
  className?: string
  changeHandler:(value:string) => void
}