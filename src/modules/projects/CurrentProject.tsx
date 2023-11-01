import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProjectModal } from '../../components/projects/ProjectModal';
import { useDeleteProjectMutation, useUpdateProjectMutation } from '../../store/services/projectsService';
import { DeleteButton } from '../../components/commons/buttons/DeleteButtonWithText';
import './projects.scss';

export const CurrentProject: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = useParams().id;
  const [updateProjectMutation] = useUpdateProjectMutation();
  const [deleteProjectMutation] = useDeleteProjectMutation();

  const updateProject = (form: FormData) => id && updateProjectMutation({ form, id });
  const deleteProject = () => id && deleteProjectMutation(id);

  return (
    <ProjectModal
      currentTitle={searchParams.get('title')}
      currentGithub={searchParams.get('github')}
      currentProjectLink={searchParams.get('project')}
      currentImage={searchParams.get('image')}
      submitCallBack={updateProject}
    >
      <DeleteButton onClick={deleteProject} icon className='deleteButton'/>
    </ProjectModal>
  )
}