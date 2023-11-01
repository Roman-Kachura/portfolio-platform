import React from 'react';
import '../../components/projects/projectsComponents.scss';
import { ProjectModal } from '../../components/projects/ProjectModal';
import { useCreateProjectMutation } from '../../store/services/projectsService';

export const AddProjectItem: React.FC = () => {
  const [createProject] = useCreateProjectMutation();
  const addProject = (form:FormData) => createProject(form);

  return (
    <ProjectModal
      submitCallBack={addProject}
    />
  )
}