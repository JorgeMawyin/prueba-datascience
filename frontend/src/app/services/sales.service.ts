import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getFilteredData(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}filter-data/`, { params });
  }

  getIndicators(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}indicators/`, { params });
  }

  getTopClients(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}top-clients/`, { params });
  }

  getSalesTimeline(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}sales-timeline/`, { params });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}categories/`);
  }

  getRegions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}regions/`);
  }
}
