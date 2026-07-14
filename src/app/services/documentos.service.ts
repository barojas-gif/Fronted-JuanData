import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private baseUrl = `${environment.apiBaseUrl}/documentos`;

  constructor(private http: HttpClient) { }

  // Para JSON
  private obtenerJsonHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Para subir archivo (sin Content-Type, el navegador lo pone)
  private obtenerUploadHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Subir documento
  crearDocumento(documento: any): Observable<any> {
    const headers = this.obtenerUploadHeaders();
    return this.http.post(`${this.baseUrl}/upload`, documento, { headers });
  }

  // Obtener más vistos
  obtenerDocumentosMasVistos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mas-vistos`, {
      headers: this.obtenerJsonHeaders()
    });
  }

  // Registrar vista
  registrarVistaDocumento(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar-vista`, data, {
      headers: this.obtenerJsonHeaders()
    });
  }

  // Obtener documentos por estado (reutilizable)
  obtenerDocumentosPendientes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/pendientes`, { headers });
  }

  // Obtener documentos por estado (reutilizable)
  obtenerDocumentosAceptados(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/aceptados`, { headers });
  }


  // Actualizar estado del documento
  actualizarEstadoDocumento(id: number, estado: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar-estado/${id}?estado=${estado}`, {}, {
      headers: this.obtenerJsonHeaders()
    });
  }

  // Eliminar documento de semillero (NO USAR, solo para referencia histórica)
  // eliminarDocumentoSemillero(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/semillero/${id}`, {
  //     headers: this.obtenerJsonHeaders()
  //   });
  // }

  actualizarEstadoYNotificar(
    id: number,
    estado: number,
    mensaje: string,
    correoEstudiante: string
  ): Observable<any> {
    const headers = this.obtenerJsonHeaders();

    return this.http.put(`${this.baseUrl}/documentos/${id}/estado`, null, {
      headers,
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

  obtenerDocumentosPorSemillero(idSemillero: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/semillero/${idSemillero}`, {
      headers: this.obtenerJsonHeaders()
    });
  }


  // Subir documento de semillero
  subirDocumentoSemillero(documento: FormData): Observable<any> {
    const headers = this.obtenerUploadHeaders(); // mantiene el token pero no pone Content-Type
    return this.http.post(`${this.baseUrl}/upload-semillero`, documento, { headers });
  }

  // Cambiar estado del documento de semillero a 0 (desactivar)
  desactivarDocumentoSemillero(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/semillero/${id}/estado`,
      { estado: 0 },
      {
        headers: this.obtenerJsonHeaders(),
        responseType: 'text' as 'json' // 👈 importante
      }
    );
  }

  eliminarDocumento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.obtenerJsonHeaders()
    });
  }

}


