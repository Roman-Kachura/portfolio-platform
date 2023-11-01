import React from 'react';
import './skillsComponents.scss';
import { NavLink } from 'react-router-dom';


export const SkillsItem: React.FC<SkillsItemProps> = ({ id, title, picture }) => {
  const link = `${id}?title=${title}&image=${picture}`;
  return (
    <NavLink to={link} className='skillsItem'>
      <div className="itemImage">
        <img src={picture} alt={title}/>
      </div>
    </NavLink>
  )
}

interface SkillsItemProps {
  id: string
  title: string
  picture: string
}