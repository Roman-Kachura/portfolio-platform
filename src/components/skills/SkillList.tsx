import React from 'react';
import {SkillsItem} from './SkillsItem';
import './skillsComponents.scss';
import {ISkill} from '../../models/ISkill';
import {AppLink} from '../commons/buttons/AppLink';

export const SkillList: React.FC<SkillListProps> = ({items}) => {
  return (
    <div className="skillsList">
      <AppLink title="+ Добавить" to={`/skills/new-skill`} className='addSkillButton'/>
      {
        items.map(
          s => <SkillsItem
            key={s._id}
            id={s._id}
            title={s.title}
            picture={s.picture}
          />
        )
      }
    </div>
  )
}

interface SkillListProps{
  items:ISkill[]
}

