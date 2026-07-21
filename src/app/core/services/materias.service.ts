import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Materia } from '../models/materia.model';
import { Documento } from '../models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Volvemos a la respuesta JSON por defecto, pero capturamos el error de parseo.
  obtenerDocumentosPorMateria(idMateria: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.apiUrl}/documentos/porMateria/${idMateria}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200 && error.error instanceof ProgressEvent) {
          console.error('Posible JSON inválido, devolviendo lista vacía');
          return of([]);
        }
        return throwError(() => new Error('Error al obtener documentos.'));
      })
    );
  }


  obtenerMateriasPorCarreraYSemestre(idCarrera: number, idSemestre: number): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materias/porCarreraYSemestre?idCarrera=${idCarrera}&idSemestre=${idSemestre}`);
  }
}
