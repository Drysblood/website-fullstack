import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  newsList: { text: string; category: string }[] = [];
  projects: { title: string; description?: string }[] = [];
  serviceList: { title: string }[] = [];
  kontaktList: { title: string }[] = [];
}
