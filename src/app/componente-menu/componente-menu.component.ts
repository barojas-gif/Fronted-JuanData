import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { DocumentosService } from '../services/documentos.service';
import { SemilleroService } from '../services/semillero.service';
import { UsuarioService } from '../services/usuarios.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-componente-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './componente-menu.component.html',
  styleUrl: './componente-menu.component.css'
})
export class ComponenteMenuComponent implements OnInit {
  rolUsuario: string = '';
  nombreUsuario: string = ''; 
  cantidadPendientes: number = 0;
  tieneSemillero: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private documentosService: DocumentosService,
    private semilleroService: SemilleroService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.rolUsuario = (decoded.rol || '').trim().toLowerCase();

        // 1. CARGAR NOMBRE REAL (nombre_usuario desde tu captura de consola)
        const nombreCache = localStorage.getItem('nombre_real_usuario');
        if (nombreCache && nombreCache !== 'undefined undefined') {
          this.nombreUsuario = nombreCache;
        } else if (decoded.idUsuario) {
          this.usuarioService.obtenerUsuarioPorId(decoded.idUsuario).subscribe({
            next: (datos: any) => {
              if (datos.nombre_usuario) {
                const nombreReal = `${datos.nombre_usuario} ${datos.apellido_usuario || ''}`.trim();
                this.nombreUsuario = nombreReal;
                localStorage.setItem('nombre_real_usuario', nombreReal);
              }
            },
            error: () => this.nombreUsuario = decoded.sub.split('@')[0]
          });
        }

        // 2. LÓGICA DE SEMILLEROS (Recuperada)
        if (this.esEstudiante() || this.esDocente()) {
          this.verificarSemillero();
        }

        // 3. LÓGICA DE ADMINISTRADOR
        if (this.esAdministrador()) {
          this.obtenerCantidadPendientes();
          interval(30000).subscribe(() => this.obtenerCantidadPendientes());
        }

      } catch (error) {
        console.error("Error decodificando el token", error);
      }
    }
  }

  obtenerRutaActual(): string {
    const path = this.location.path();
    if (path.includes('AdministracionUsuarios')) return 'Gestión de Usuarios';
    if (path.includes('ArchivosAceptados')) return 'Documentos Aceptados';
    if (path.includes('ArchivosPendientes')) return 'Documentos Pendientes';
    if (path.includes('semillero')) return 'Semillero de Investigación';

    const segmentos = path.split('/');
    let ultimo = segmentos[segmentos.length - 1];
    if (ultimo && ultimo !== 'Inicio' && ultimo !== '') {
      ultimo = decodeURIComponent(ultimo);
      return !isNaN(Number(ultimo)) ? `Semestre ${ultimo}` : ultimo;
    }
    return 'Inicio / Repositorio';
  }

  esEstudiante(): boolean { return this.rolUsuario === 'estudiante'; }
  esAdministrador(): boolean { return this.rolUsuario === 'administrador'; }
  esDocente(): boolean { return this.rolUsuario === 'docente'; }

  verificarSemillero(): void {
    this.semilleroService.obtenerSemilleroUsuario().subscribe({
      next: (semillero) => { this.tieneSemillero = !!semillero; },
      error: () => { this.tieneSemillero = false; }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('nombre_real_usuario');
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  obtenerCantidadPendientes() {
    this.documentosService.obtenerCantidadDocumentosPendientes().subscribe({
      next: (cantidad) => { this.cantidadPendientes = cantidad; },
      error: (error) => console.error(error)
    });
  }
}