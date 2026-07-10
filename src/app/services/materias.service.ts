import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  obtenerMateriasPorSemestre(semestre: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materias/porSemestre/${semestre}`);
  }

  // NUEVO MÉTODO CORREGIDO
  // Volvemos a la respuesta JSON por defecto, pero capturamos el error de parseo.
  obtenerDocumentosPorMateria(idMateria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documentos/porMateria/${idMateria}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200 && error.error instanceof ProgressEvent) {
          console.error('Posible JSON inválido, devolviendo lista vacía');
          return of([]);
        }
        return throwError(() => new Error('Error al obtener documentos.'));
      })
    );
  }
  

  obtenerMateriasPorCarreraYSemestre(idCarrera: number, idSemestre: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materias/porCarreraYSemestre?idCarrera=${idCarrera}&idSemestre=${idSemestre}`);
  }
}