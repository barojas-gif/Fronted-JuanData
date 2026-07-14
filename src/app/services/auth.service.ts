import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(correoUsuario: string, contrasenaUsuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correoUsuario, contrasenaUsuario });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  guardarToken(token: string, id_usuario: number, nombreUsuario: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('id_usuario', id_usuario.toString());
    console.log('Token y idUsuario guardados');
    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerIdUsuario(): string | null {
    return localStorage.getItem('id_usuario');
  }

  obtenerNombreUsuario(): string | null {
    return localStorage.getItem('nombreUsuario');
  }

  obtenerDatosToken(): any {
    const token = this.obtenerToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      return JSON.parse(payloadDecoded);
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    console.log('Sesión cerrada');
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // true si existe token
  }

  recuperarContrasena(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { username });
  }

  guardarTemporal(temporal: boolean) {
    localStorage.setItem('temporal', temporal.toString());
  }

  esTemporal(): boolean {
    return localStorage.getItem('temporal') === 'true';
  }

  removerTemporal() {
    localStorage.removeItem('temporal');
  }

  actualizarContrasena(nuevaContrasena: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-contrasena`, {
      nuevaContrasena
    });
  }

  getCarreras(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/carreras/listar`);
  }
}
