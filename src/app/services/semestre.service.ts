import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerSemestresPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/semestresUsuario/${idUsuario}`);
  }
}
