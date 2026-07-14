import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

// Componentes y Servicios
import { ComponenteMenuComponent } from "../componente-menu/componente-menu.component";
import { ComponenteModalMensajeComponent } from '../componente-modal-mensaje/componente-modal-mensaje.component';
import { DocumentosService } from '../services/documentos.service';
import { VistaDocumentoService } from '../services/vista-documento.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-componente-archivos-pendientes',
  standalone: true,
  imports: [CommonModule, ComponenteMenuComponent, ComponenteModalMensajeComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './componente-archivos-pendientes.component.html',
  styleUrls: ['./componente-archivos-pendientes.component.css']
})
export class ComponenteArchivosPendientesComponent implements OnInit {

  // --- Variables de Datos ---
  documentosPendientes: any[] = [];
  terminoBusqueda: string = '';

  // --- Variables de Paginación ---
  paginaActual: number = 1;
  elementosPorPagina: number = 5;

  // --- Variables de Ordenamiento ---
  columnaOrden: string = 'fechaDocumento';
  ordenAscendente: boolean = false;

  // --- Variables del Modal ---
  mostrarModal = false;
  documentoSeleccionado: any = null;
  accionModal: 'aceptar' | 'rechazar' = 'aceptar';

  constructor(
    private documentosService: DocumentosService,
    private sanitizer: DomSanitizer,
    private vistaDocumentoService: VistaDocumentoService
  ) { }

  ngOnInit(): void {
    this.cargarDocumentosPendientes();
  }

  // --- Carga de Datos ---
  cargarDocumentosPendientes() {
    this.documentosService.obtenerDocumentosPendientes().subscribe({
      next: (data) => {
        this.documentosPendientes = data;
        console.log('📄 Documentos cargados:', this.documentosPendientes.length);
      },
      error: (err) => {
        console.error('Error al cargar documentos:', err);
      }
    });
  }

  // --- Lógica del Modal ---
  abrirModal(documento: any, accion: 'aceptar' | 'rechazar') {
    this.documentoSeleccionado = { ...documento };
    this.accionModal = accion;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.documentoSeleccionado = null;
  }

  // --- ACCIÓN PRINCIPAL (Enviar Aceptación/Rechazo) ---
  enviarMensaje(datos: { id: number, mensaje: string, tipo: string }) {
    // Definimos el estado basado en la acción del modal
    // Estado 1 = Aceptado, Estado 2 = Rechazado
    const nuevoEstado = datos.tipo === 'aceptar' ? 1 : 2;
    const correo = this.documentoSeleccionado?.correoEstudiante;

    if (!correo) {
      Swal.fire('Error', 'No se encontró el correo del estudiante.', 'error');
      return;
    }

    this.cerrarModal();

    Swal.fire({
      title: 'Actualizando Estado...',
      text: `Cambiando a estado ${nuevoEstado} y notificando...`,
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    // IMPORTANTE: Asegúrate de que el orden de los parámetros coincida con tu Service
    this.documentosService.actualizarEstadoYNotificar(
      datos.id,
      nuevoEstado, // Pasamos el 1 o 2 aquí
      datos.mensaje,
      correo
    ).subscribe({
      next: () => {
        this.notificarExito(nuevoEstado, datos.id);
      },
      error: (err) => {
        // Manejo de la respuesta 200 OK que llega como texto (común en cambios de estado)
        if (err.status === 200) {
          this.notificarExito(nuevoEstado, datos.id);
        } else {
          console.error('Error al actualizar en BD:', err);
          Swal.fire('Error', 'No se pudo actualizar el estado en Juan-Data', 'error');
        }
      }
    });
  }

  private notificarExito(estado: number, id: number) {
    const titulo = estado === 1 ? '¡Aceptado!' : '¡Rechazado!';
    const msg = estado === 1 ? 'El documento pasó a estado Aceptado (1).' : 'El documento fue Rechazado (2).';

    Swal.fire({
      icon: 'success',
      title: titulo,
      text: `${msg} Correo enviado exitosamente.`,
      timer: 2000,
      showConfirmButton: false
    });

    this.removerDocumentoDeListaLocal(id);
  }

  // --- Lógica de Tabla (Orden, Filtro, Paginación) ---
  ordenarPor(columna: string) {
    if (this.columnaOrden === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.columnaOrden = columna;
      this.ordenAscendente = true;
    }
    this.paginaActual = 1;
  }

  getSortIcon(columna: string): string {
    if (this.columnaOrden !== columna) return 'bi-arrow-down-up text-muted';
    return this.ordenAscendente ? 'bi-sort-up primary' : 'bi-sort-down primary';
  }

  reiniciarPagina() {
    this.paginaActual = 1;
  }

  get documentosFiltrados(): any[] {
    let docs = [...this.documentosPendientes];

    // Búsqueda
    if (this.terminoBusqueda.trim()) {
      const t = this.terminoBusqueda.toLowerCase();
      docs = docs.filter(d =>
        d.nombreEstudiante.toLowerCase().includes(t) ||
        d.apellidoEstudiante.toLowerCase().includes(t) ||
        d.temaDocumento.toLowerCase().includes(t) ||
        d.tituloDocumento.toLowerCase().includes(t)
      );
    }

    // Ordenamiento
    docs.sort((a, b) => {
      let valA = a[this.columnaOrden];
      let valB = b[this.columnaOrden];

      if (this.columnaOrden === 'fechaDocumento') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else {
        valA = valA?.toString().toLowerCase();
        valB = valB?.toString().toLowerCase();
      }

      if (valA < valB) return this.ordenAscendente ? -1 : 1;
      if (valA > valB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    return docs;
  }

  documentosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.documentosFiltrados.slice(inicio, inicio + this.elementosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.documentosFiltrados.length / this.elementosPorPagina);
  }

  private removerDocumentoDeListaLocal(id: number) {
    this.documentosPendientes = this.documentosPendientes.filter(d => d.idDocumento !== id);
    if (this.paginaActual > this.totalPaginas && this.totalPaginas > 0) {
      this.paginaActual = this.totalPaginas;
    }
  }

  // --- Manejo de Archivos ---
  obtenerIconoArchivo(nombre: string): string {
    const ext = nombre.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'assets/pdf-icon.png';
      case 'doc': case 'docx': return 'assets/word-icon.png';
      case 'xls': case 'xlsx': return 'assets/excel-icon.png';
      default: return 'assets/file-icon.png';
    }
  }

  abrirDocumento(doc: any) {
    const nombre = doc.archivoDocumento;
    const ext = nombre.split('.').pop()?.toLowerCase();
    const urlBackend = `${environment.uploadsBaseUrl}${encodeURIComponent(nombre)}`;

    if (ext === 'pdf') {
      window.open(`/assets/pdfjs/web/viewer.html?file=${urlBackend}`, '_blank');
    } else {
      window.open(urlBackend, '_blank');
    }
  }
}