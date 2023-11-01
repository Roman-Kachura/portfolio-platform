import React from 'react';
import './projects.scss';
import { Title } from '../../components/commons/titles/Title';
import { ProjectsList } from '../../components/projects/ProjectsList';

export const Projects: React.FC = () => {
  return (
    <div className="projects">
      <Title title="Проекты"/>
      <ProjectsList/>
    </div>
  )
}