import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface ServiceEntry {
  id: number;
  name: string;
  description: string;
  created?: string;
  imageUrl?: string; // Optionales Bild
  category?: string; // Kategorie-Badge
  link?: string; // Externer Link
  status?: string; // Status-Badge (z.B. "Aktiv")
  price?: number; // Preis für die Dienstleistung
  stack?: string; // z.B. "Angular, Django"
  buyUrl?: string; // Link zum Kaufen/Buchen
  features?: string; // Kommagetrennte Features
  discount?: number; // Rabatt in Prozent
}

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private apiUrl = `${environment.apiUrl}/service/`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceEntry[]> {
    return this.http.get<ServiceEntry[]>(this.apiUrl);
  }

  addService(service: Partial<ServiceEntry>): Observable<ServiceEntry> {
    return this.http.post<ServiceEntry>(this.apiUrl, service);
  }

  updateService(id: number, service: Partial<ServiceEntry>): Observable<ServiceEntry> {
    return this.http.put<ServiceEntry>(`${this.apiUrl}${id}/`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
