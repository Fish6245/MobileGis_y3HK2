import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incident {
  id?: number;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
  type?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = 'http://localhost:3000/api/incidents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  getNearby(lat: number, lng: number) {
    return this.http.get<any[]>(
      `http://localhost:3000/api/incidents/nearby?lat=${lat}&lng=${lng}`,
    );
  }

  create(data: Incident) {
    return this.http.post(this.apiUrl, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: Incident) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
