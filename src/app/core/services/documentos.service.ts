import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Documento, DocumentoMasVisto, DocumentoPendiente } from '../models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private baseUrl = `${environment.apiBaseUrl}/documentos`;

  constructor(private http: HttpClient) { }

  // Subir documento
  crearDocumento(documento: FormData): Observable<{ fileUrl: string; message: string }> {
    return this.http.post<{ fileUrl: string; message: string }>(`${this.baseUrl}/upload`, documento);
  }

  // Obtener más vistos
  obtenerDocumentosMasVistos(): Observable<DocumentoMasVisto[]> {
    return this.http.get<DocumentoMasVisto[]>(`${this.baseUrl}/mas-vistos`);
  }

  // Registrar vista
  registrarVistaDocumento(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar-vista`, data);
  }

  // Obtener documentos por estado (reutilizable)
  obtenerDocumentosPendientes(): Observable<DocumentoPendiente[]> {
    return this.http.get<DocumentoPendiente[]>(`${this.baseUrl}/pendientes`);
  }

  // Obtener documentos por estado (reutilizable)
  obtenerDocumentosAceptados(): Observable<DocumentoPendiente[]> {
    return this.http.get<DocumentoPendiente[]>(`${this.baseUrl}/aceptados`);
  }


  // Actualizar estado del documento
  actualizarEstadoDocumento(id: number, estado: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar-estado/${id}?estado=${estado}`, {});
  }

  actualizarEstadoYNotificar(
    id: number,
    estado: number,
    mensaje: string,
    correoEstudiante: string
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/documentos/${id}/estado`, null, {
      params: {
        estado: estado.toString(),
        mensaje,
        correoEstudiante
      }
    });
  }

  obtenerCantidadDocumentosPendientes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/pendientes/count`);
  }

  obtenerDocumentosPorSemillero(idSemillero: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}/semillero/${idSemillero}`);
  }

  // Subir documento de semillero
  subirDocumentoSemillero(documento: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/upload-semillero`, documento);
  }

  // Cambiar estado del documento de semillero a 0 (desactivar)
  desactivarDocumentoSemillero(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/semillero/${id}/estado`,
      { estado: 0 },
      { responseType: 'text' as 'json' } // 👈 importante: el backend responde texto plano
    );
  }

  eliminarDocumento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
