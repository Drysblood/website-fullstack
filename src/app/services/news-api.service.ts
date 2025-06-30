import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface News {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string; // Bild-URL für News
  created?: string;
}

@Injectable({ providedIn: 'root' })
export class NewsApiService {
  private apiUrl = 'http://localhost:8000/api/news/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  add(news: News): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
