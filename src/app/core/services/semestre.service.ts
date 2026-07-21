import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Semestre } from '../models/semestre.model';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  private baseUrl = `${environment.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  obtenerSemestresPorUsuario(idUsuario: number): Observable<Semestre[]> {
    return this.http.get<Semestre[]>(`${this.baseUrl}/semestresUsuario/${idUsuario}`);
  }
}
