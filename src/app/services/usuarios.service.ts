import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuarioDTO } from '../DTO/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(
    private http: HttpClient,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService
  ) { }

  getSemestresPorUsuario(idUsuario: number): Observable<any> {
    const token = this.authService.obtenerToken();
    console.log('Token usado:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/semestres-por-usuario/${idUsuario}`, { headers });
  }

  //Obtener lista de usuarios
  // listarUsuariosSimplificado(): Observable<any[]>{
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization : `Bearer ${token}`
  //   });

  //   return this.http.get<any[]>('http://localhost:8080/api/usuarios/listar', { headers });

  // }

  listarRoles(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8080/api/roles/listar', { headers });
  }


  listarCarreras(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8080/api/carreras/listar', { headers });
  }


  // crearUsuario(usuario: UsuarioDTO): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/crear`, usuario);
  // }

  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, usuario, {
      responseType: 'text'
    });
  }

  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, usuario);
  }

  desactivarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`http://localhost:8080/api/usuarios/desactivar/${id}`, null, { headers });
  }

  obtenerUsuarioPorId(id: number): Observable<UsuarioDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<UsuarioDTO>(`http://localhost:8080/api/usuarios/buscar/${id}`, { headers });
  }

  listarUsuariosPorCarreraDelAdmin(): Observable<UsuarioDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/listarPorCarreraDelAdmin`, { headers });
  }

  verificarCorreoExiste(correo: string): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<boolean>(`http://localhost:8080/api/usuarios/existe-correo?correo=${correo}`, { headers });
  }

  // En usuarios.service.ts

  // En usuarios.service.ts
  verificarDocumentoExiste(documento: string): Observable<boolean> {
    // Prueba esta forma (Ruta) si la de (Parametros) falla
    return this.http.get<boolean>(`${this.apiUrl}/existe-documento/${documento}`);
  }

}
