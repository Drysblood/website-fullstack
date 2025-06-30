import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService, Project } from '../../services/projects-api.service';

@Component({
  selector: 'app-projecte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projecte.html',
  styleUrl: './projecte.scss'
})
export class Projecte implements OnInit {
  projects: Project[] = [];

  constructor(private projectsApi: ProjectsApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsApi.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  // Weitere Methoden für Add, Update, Delete können hier ergänzt werden
}
