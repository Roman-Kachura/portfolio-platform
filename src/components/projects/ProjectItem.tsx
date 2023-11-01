import React, { FC } from 'react';
import { IProject } from '../../models/IProject';
import { NavLink } from 'react-router-dom';
import './projectsComponents.scss';

export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  const searchParamsString = `${project._id}?title=${project.name}&image=${project.picture.url}&github=${project.github}&project=${project.url}`;
  return (
    <NavLink
      to={`/projects/${searchParamsString}`}
      className="projectsItem"
    >
      <h4 className="itemTitle">{project.name}</h4>
      <img
        className="itemImage"
        alt={project.picture.name}
        title={project.picture.name}
        src={project.picture.url}
      />
    </NavLink>
  )
}

interface ProjectItemProps {
  project: IProject
}