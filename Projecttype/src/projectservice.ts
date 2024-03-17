import { Project } from './project.ts';

export class ProjectService {
  private static PROJECTS_KEY = 'projects';

  static getProjects(): Project[] {
    const projectsData = localStorage.getItem(this.PROJECTS_KEY);
    if (projectsData) {
      return JSON.parse(projectsData);
    } else {
      return [];
    }
  }

  static saveProjects(projects: Project[]): void {
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    this.saveProjects(projects);
  }

  static deleteProject(projectId: number): void {
    let projects = this.getProjects();
    projects = projects.filter(project => project.id !== projectId);
    this.saveProjects(projects);
  }

  static updateProject(updatedProject: Project): void {
    let projects = this.getProjects();
    const index = projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      this.saveProjects(projects);
    }
  }
}