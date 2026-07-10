import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SemilleroService {

  private baseUrl = 'http://localhost:8080/api/semilleros';

  constructor(private http: HttpClient) { }

  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  obtenerSemilleroUsuario(): Observable<any | null> {
    return this.http.get<any>('http://localhost:8080/api/documentos/usuario/mi-semillero', {
      headers: this.obtenerHeaders(),
      observe: 'response'
    }).pipe(
      map(resp => resp.status === 204 ? null : resp.body)
    );
  }

  getTodosSemilleros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, {
      headers: this.obtenerHeaders()
    });
  }

  getSemilleroPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.obtenerHeaders()
    });
  }

  getSemillerosPorCarrera(idCarrera: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/carrera/${idCarrera}`, {
      headers: this.obtenerHeaders()
    });
  }

  crearSemillero(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, {
      headers: this.obtenerHeaders()
    });
  }

  eliminarSemillero(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.obtenerHeaders()
    });
  }

  // Obtener semilleros por usuario
  getSemillerosPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${idUsuario}`, {
      headers: this.obtenerHeaders()
    });
  }


  // Obtener documentos por usuario
  getDocumentosPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/documentos/usuario/${idUsuario}/documentos`, {
      headers: this.obtenerHeaders()
    });
  }

}
