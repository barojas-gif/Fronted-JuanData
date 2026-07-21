import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO, UsuarioSimpleDTO } from '../models/usuario.dto';
import { Rol } from '../models/rol.model';
import { Carrera } from '../models/carrera.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  listarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.apiBaseUrl}/roles/listar`);
  }

  listarCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${environment.apiBaseUrl}/carreras/listar`);
  }

  crearUsuario(usuario: UsuarioDTO): Observable<string> {
    return this.http.post(`${this.apiUrl}/crear`, usuario, {
      responseType: 'text'
    });
  }

  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, usuario);
  }

  desactivarUsuario(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/desactivar/${id}`, null);
  }

  obtenerUsuarioPorId(id: number): Observable<UsuarioSimpleDTO> {
    return this.http.get<UsuarioSimpleDTO>(`${this.apiUrl}/buscar/${id}`);
  }

  listarUsuariosPorCarreraDelAdmin(): Observable<UsuarioSimpleDTO[]> {
    return this.http.get<UsuarioSimpleDTO[]>(`${this.apiUrl}/listarPorCarreraDelAdmin`);
  }

  verificarCorreoExiste(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existe-correo?correo=${correo}`);
  }

  verificarDocumentoExiste(documento: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existe-documento/${documento}`);
  }

}
