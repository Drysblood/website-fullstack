import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface KontaktEntry {
    id: number;
    name: string;
    email: string;
    message: string;
    created?: string;
}

@Injectable({ providedIn: 'root' })
export class KontaktApiService {
    private apiUrl = 'http://localhost:8000/api/kontakt/';

    constructor(private http: HttpClient) { }

    getKontakte(): Observable<KontaktEntry[]> {
        return this.http.get<KontaktEntry[]>(this.apiUrl);
    }

    addKontakt(kontakt: Partial<KontaktEntry>): Observable<KontaktEntry> {
        return this.http.post<KontaktEntry>(this.apiUrl, kontakt);
    }

    updateKontakt(id: number, kontakt: Partial<KontaktEntry>): Observable<KontaktEntry> {
        return this.http.put<KontaktEntry>(`${this.apiUrl}${id}/`, kontakt);
    }

    deleteKontakt(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}${id}/`);
    }
}
