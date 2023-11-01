import React from 'react';
import {Skills} from '../modules/skills/Skills';
import {Outlet} from 'react-router-dom';


export const SkillsPage: React.FC = () => {
  return (
    <>
      <Skills/>
      <Outlet/>
    </>
  )
}