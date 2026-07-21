import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MiSemillero, Semillero } from '../models/semillero.model';
import { DocumentoSemillero } from '../models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class SemilleroService {

  private baseUrl = `${environment.apiBaseUrl}/semilleros`;

  constructor(private http: HttpClient) { }

  obtenerSemilleroUsuario(): Observable<MiSemillero | null> {
    return this.http.get<MiSemillero>(`${environment.apiBaseUrl}/documentos/usuario/mi-semillero`, {
      observe: 'response'
    }).pipe(
      map(resp => resp.status === 204 ? null : resp.body)
    );
  }

  getTodosSemilleros(): Observable<Semillero[]> {
    return this.http.get<Semillero[]>(`${this.baseUrl}`);
  }

  getSemilleroPorId(id: number): Observable<Semillero> {
    return this.http.get<Semillero>(`${this.baseUrl}/${id}`);
  }

  getSemillerosPorCarrera(idCarrera: number): Observable<Semillero[]> {
    return this.http.get<Semillero[]>(`${this.baseUrl}/carrera/${idCarrera}`);
  }

  crearSemillero(data: any): Observable<Semillero> {
    return this.http.post<Semillero>(`${this.baseUrl}`, data);
  }

  eliminarSemillero(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Obtener semilleros por usuario
  getSemillerosPorUsuario(idUsuario: number): Observable<Semillero[]> {
    return this.http.get<Semillero[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  // Obtener documentos por usuario
  getDocumentosPorUsuario(idUsuario: number): Observable<DocumentoSemillero[]> {
    return this.http.get<DocumentoSemillero[]>(`${environment.apiBaseUrl}/documentos/usuario/${idUsuario}/documentos`);
  }

}
