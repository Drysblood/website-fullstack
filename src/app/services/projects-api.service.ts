import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Project {
  id: number;
  name: string;
  description: string;
  applications?: string; // Anwendungen
  version?: string;      // Version der Anwendung
  imageUrl?: string;     // Bild-URL
  link?: string;         // Projekt-Link
  github?: string;       // GitHub-Link
  created?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private apiUrl = `${environment.apiUrl}/projects/`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}${id}/`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
