import React, { FC } from 'react';
import { Projects } from '../modules/projects/Projects';
import { Outlet } from 'react-router-dom';

export const ProjectsPage: FC = () => {
  return (
    <>
      <Projects/>
      <Outlet/>
    </>
  )
}