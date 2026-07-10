import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VistaDocumentoService {

  private apiUrl = 'http://localhost:8080/api/documentos';

  constructor(private http: HttpClient) { }

  registrarVista(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-vista`, data);
  }
}
