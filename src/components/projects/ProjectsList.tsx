import React from 'react';
import { useGetAllProjectQuery } from '../../store/services/projectsService';
import { ProjectItem } from './ProjectItem';
import './projectsComponents.scss';
import { AppLink } from '../commons/buttons/AppLink';

export const ProjectsList: React.FC = () => {
  const { data: projects } = useGetAllProjectQuery();
  return (
    <div className="projectsList">
      <AppLink title="+ Добавить" to={`/projects/new-project`} className="listAddButton"/>
      {
        projects && projects.map(p => <ProjectItem key={p._id} project={p}/>)
      }
    </div>
  )
}