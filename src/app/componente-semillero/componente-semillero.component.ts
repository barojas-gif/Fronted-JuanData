import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComponenteMenuComponent } from "../componente-menu/componente-menu.component";
import { DatePipe } from '@angular/common';
import { ComponenteModalDocSemilleroComponent } from "../componente-modal-DocSemillero/componente-modal-DocSemillero.component";
import { DocumentosService } from '../services/documentos.service';
import { CommonModule } from '@angular/common';
import { SemilleroService } from '../services/semillero.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-componente-semillero',
  templateUrl: './componente-semillero.component.html',
  styleUrls: ['./componente-semillero.component.css'],
  standalone: true,
  imports: [
    ComponenteMenuComponent,
    DatePipe,
    ComponenteModalDocSemilleroComponent,
    CommonModule
  ]
})
export class ComponenteSemilleroComponent implements OnInit {

  rolUsuario: string = '';
  documentos: any[] = [];
  categorias: string[] = ['Investigación', 'Formatos', 'Documentos', 'Otros'];
  documentosPorCategoria: { [key: string]: any[] } = {};
  idDelSemillero: number | null = null;
  semilleroNombre: string = '';
  readonly environment = environment;

  constructor(private documentosService: DocumentosService,
    private semilleroService: SemilleroService
  ) { }

  ngOnInit() {
    this.cargarDocumentos();
    this.cargarSemillero();
    this.initRolUsuario();
    // Si tienes el ID del usuario guardado en localStorage
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    if (idUsuario) {
      this.cargarDocumentosPorUsuario(idUsuario);
    }
  }

  private initRolUsuario(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.rolUsuario = (decoded.rol || '').trim().toLowerCase();
      console.log("ROL DETECTADO (semillero):", this.rolUsuario);
    }
  }

  esEstudiante(): boolean {
    return this.rolUsuario === 'estudiante';
  }

  esAdministrador(): boolean {
    return this.rolUsuario === 'administrador';
  }

  esDocente(): boolean {
    return this.rolUsuario === 'docente';
  }

  cargarDocumentos() {
    if (!this.idDelSemillero) {
      console.warn("⚠️ No se puede cargar documentos porque el usuario no tiene semillero");
      return;
    }

    this.documentosService.obtenerDocumentosPorSemillero(this.idDelSemillero).subscribe({
      next: (docs) => {
        docs.sort((a, b) => new Date(b.fechaDocumento).getTime() - new Date(a.fechaDocumento).getTime());
        console.log('✅ Documentos cargados', docs);
        this.documentos = docs;
        this.documentosPorCategoria = {};
        this.categorias.forEach(cat => {
          this.documentosPorCategoria[cat] = docs.filter(d => d.categoria === cat);
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar documentos', err);
      }
    });
  }


  agregarDocumento(doc: any) {
    // podrías subir doc aquí si lo necesitas
    this.cargarDocumentos(); // Refresca la lista después de agregar
  }

  verDocumento(doc: any) {
    if (doc.archivoDocumento) {
      const url = `/api/documentos/uploads/${doc.archivoDocumento}`;
      window.open(url, '_blank');
    } else {
      alert('No hay archivo para mostrar.');
    }
  }

  descargarDocumento(doc: any) {
    if (doc.url) {
      window.open(doc.url, '_blank'); // también podrías hacer descarga directa con <a download>
    } else {
      alert('No hay archivo para descargar.');
    }
  }

  desactivarDocumento(doc: any) {
    Swal.fire({
      title: '¿Eliminar documento?',
      text: `¿Seguro que deseas eliminar "${doc.tituloDocumento}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentosService.desactivarDocumentoSemillero(doc.idDocumento).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El documento fue desactivado correctamente.',
              timer: 1800,
              showConfirmButton: false
            });
            this.cargarDocumentos();
          },
          error: (err: any) => {
            let msg = 'Error al desactivar el documento.';
            if (err.status === 403) {
              msg = 'No tienes permisos para desactivar este documento (403).';
            } else if (err.error && err.error.message) {
              msg = err.error.message;
            }
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: msg,
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  cargarSemillero() {
    this.semilleroService.obtenerSemilleroUsuario().subscribe({
      next: (semillero) => {
        if (!semillero) {
          console.log("⚠️ El usuario no tiene semillero asignado");
          this.documentos = [];
          return;
        }

        this.idDelSemillero = semillero.idSemillero;
        this.semilleroNombre = semillero.nombreSemillero;

        console.log("✅ Semillero detectado:", semillero);

        this.cargarDocumentos();
      },
      error: (err) => {
        console.error("❌ Error obteniendo semillero", err);
      }
    });
  }


  cargarDocumentosPorUsuario(idUsuario: number) {
    this.semilleroService.getDocumentosPorUsuario(idUsuario).subscribe({
      next: (docs) => {
        // Ordenar por fecha descendente
        docs.sort((a, b) => new Date(b.fechaDocumento).getTime() - new Date(a.fechaDocumento).getTime());
        console.log('✅ Documentos del usuario cargados', docs);
        this.documentos = docs;
        this.documentosPorCategoria = {};
        this.categorias.forEach(cat => {
          this.documentosPorCategoria[cat] = docs.filter(d => d.categoria === cat);
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar documentos del usuario', err);
        alert('Error al cargar documentos del usuario: ' + (err.message || err.statusText || JSON.stringify(err)));
      }
    });
  }


}

