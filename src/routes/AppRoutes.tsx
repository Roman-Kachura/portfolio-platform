import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {SkillsPage} from '../pages/SkillsPage';
import {Page404} from '../pages/Page404';
import {FilesPage} from '../pages/FilesPage';
import {ProjectsPage} from '../pages/ProjectsPage';
import {ContactsPage} from '../pages/ContactsPage';
import {LoginPage} from '../pages/LoginPage';
import {useAppSelector} from '../store/store';
import {AddSkillItem} from '../components/skills/AddSkillItem';
import { CurrentSkill } from '../components/skills/CurrentSkill';
import { AddProjectItem } from '../modules/projects/AddProjectItem';
import { CurrentProject } from '../modules/projects/CurrentProject';
import { CurrentSocial } from '../components/contacts/socials/CurrentSocial';
import { NewSocial } from '../components/contacts/socials/NewSocial';

export const AppRoutes: React.FC = () => {
  const user = useAppSelector(state => state.userReducer.user);

  return (
    <Routes>
      <Route path="/skills" element={user ? <SkillsPage/> : <Navigate to="/auth/login"/>}>
        <Route path="new-skill" element={<AddSkillItem/>}/>
        <Route path=":id" element={<CurrentSkill/>}/>
      </Route>
      <Route path="/files" element={user ? <FilesPage/> : <Navigate to="/auth/login"/>}/>
      <Route path="/projects" element={user ? <ProjectsPage/> : <Navigate to="/auth/login"/>}>
        <Route path="new-project" element={<AddProjectItem/>}/>
        <Route path=":id" element={<CurrentProject/>}/>
      </Route>
      <Route path="/contacts" element={user ? <ContactsPage/> : <Navigate to="/auth/login"/>}>
        <Route path="new-social" element={<NewSocial/>}/>
        <Route path="social/:id" element={<CurrentSocial/>}/>
      </Route>
      <Route path="/auth/login" element={user ? <Navigate to="/skills"/> : <LoginPage/>}/>
      <Route path="/404" element={<Page404/>}/>
      <Route path="*" element={<Navigate to={'/404'}/>}/>
      <Route path="/" element={<Navigate to={'/skills'}/>}/>
    </Routes>
  )
}