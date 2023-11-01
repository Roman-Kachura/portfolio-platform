import {Title} from '../../components/commons/titles/Title';
import React from 'react';
import {useFetchAllSkillsQuery} from '../../store/services/skillService';
import {SkillList} from '../../components/skills/SkillList';
import './skills.scss';

export const Skills = () => {
  const {data: skills, isSuccess} = useFetchAllSkillsQuery({});

  return (
    <div className="skills">
      <Title title={'Навыки'}/>
      {isSuccess && <SkillList items={skills}/>}
    </div>
  )
}