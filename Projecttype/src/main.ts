// main.ts

import './style.css';
import { ProjectService } from './projectservice.ts';
import { Project } from './project.ts'; 

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>ProjectManage</h1>
    <button id="add-project">Add Project</button>
    <ul id="project-list"></ul>
  </div>
`;

const projectList = document.getElementById('project-list')!;
const addProjectButton = document.getElementById('add-project')!;

function renderProjects(): void {
  const projects = ProjectService.getProjects();
  projectList.innerHTML = '';
  projects.forEach(project => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>${project.name}</div>
      <div>${project.description}</div>
      <button class="delete-project" data-id="${project.id}">Delete</button>
      <button class="edit-project" data-id="${project.id}">Edit</button>
    `;
    projectList.appendChild(li);
  });
}

addProjectButton.addEventListener('click', () => {
  const newProject: Project = {
    id: Math.floor(Math.random() * 1000), // generate random id for simplicity
    name: 'New Project',
    description: 'Description for New Project'
  };
  ProjectService.addProject(newProject);
  renderProjects();
});

projectList.addEventListener('click', event => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('delete-project')) {
    const projectId = parseInt(target.dataset.id!);
    ProjectService.deleteProject(projectId);
    renderProjects();
  } else if (target.classList.contains('edit-project')) {
    const projectId = parseInt(target.dataset.id!);
    const newName = prompt('Enter new name for project:');
    const newDescription = prompt('Enter new description for project:');
    if (newName !== null && newDescription !== null) {
      const updatedProject: Project = {
        id: projectId,
        name: newName,
        description: newDescription
      };
      ProjectService.updateProject(updatedProject);
      renderProjects();
    }
  }
});

renderProjects();
