import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Traffic {
  id: number;
  color: string;
  coordinates: number[][];
}

@Injectable({
  providedIn: 'root',
})
export class TrafficService {
  private apiUrl = 'http://localhost:3000/api/traffic';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Traffic[]> {
    return this.http.get<Traffic[]>(this.apiUrl);
  }
}
