import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteMenuComponent } from "../componente-menu/componente-menu.component";
import { DocumentosService } from '../services/documentos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente-archivos-aceptados',
  standalone: true,
  imports: [ComponenteMenuComponent, CommonModule, FormsModule],
  templateUrl: './componente-archivos-aceptados.component.html',
  styleUrl: './componente-archivos-aceptados.component.css'
})
export class ComponenteArchivosAceptadosComponent {
  // Variables para ordenamiento de columnas
  columnaOrden: string = 'fechaDocumento';
  ordenAscendente: boolean = false;

  ordenarPor(columna: string) {
    if (this.columnaOrden === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.columnaOrden = columna;
      this.ordenAscendente = true;
    }
    this.paginaActual = 1;
  }

  documentosAceptados: any[] = [];
  terminoBusqueda: string = '';
  paginaActual: number = 1;
  elementosPorPagina: number = 5;

  constructor(private documentosService: DocumentosService) { }

  ngOnInit(): void {
    this.cargarDocumentosPendientes();
  }

  cargarDocumentosPendientes() {
    this.documentosService.obtenerDocumentosAceptados().subscribe({
      next: (data) => {
        // Ordena por fecha descendente
        this.documentosAceptados = data.sort((a: any, b: any) =>
          new Date(b.fechaDocumento).getTime() - new Date(a.fechaDocumento).getTime()
        );
      },
      error: (err) => {
        console.error('Error al cargar documentos aceptados:', err);
      }
    });
  }

  //Para que reconozca la extencion de cada archivo
  obtenerIconoArchivo(nombreArchivo: string): string {
    const extension = nombreArchivo.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return 'assets/pdf-icon.png';
      case 'doc':
      case 'docx':
        return 'assets/word-icon.png';
      case 'xls':
      case 'xlsx':
        return 'assets/excel-icon.png';
      case 'ppt':
      case 'pptx':
        return 'assets/powerpoint-icon.png';
      default:
        return 'assets/file-icon.png'; // icono genérico
    }
  }

  // REINICIAR PAGINACIÓN AL CAMBIAR TÉRMINO
  onBuscarCambio() {
    this.paginaActual = 1;
  }

  reiniciarPagina() {
    this.paginaActual = 1;
  }

  get documentosFiltrados(): any[] {
    let docs = this.documentosAceptados;
    // Filtrado por búsqueda
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase();
      docs = docs.filter(documento =>
        (documento.nombreEstudiante?.toLowerCase() ?? '').includes(termino) ||
        (documento.apellidoEstudiante?.toLowerCase() ?? '').includes(termino) ||
        (documento.fechaDocumento?.toString().toLowerCase() ?? '').includes(termino) ||
        (documento.temaDocumento?.toLowerCase() ?? '').includes(termino) ||
        (documento.tituloDocumento?.toString().toLowerCase() ?? '').includes(termino)
      );
    }
    // Ordenamiento por columna
    if (this.columnaOrden) {
      docs = docs.slice().sort((a: any, b: any) => {
        let valA = a[this.columnaOrden];
        let valB = b[this.columnaOrden];
        // Si es fecha, convertir a Date
        if (this.columnaOrden === 'fechaDocumento') {
          valA = new Date(valA);
          valB = new Date(valB);
        } else {
          valA = valA?.toString().toLowerCase();
          valB = valB?.toString().toLowerCase();
        }
        if (valA < valB) return this.ordenAscendente ? -1 : 1;
        if (valA > valB) return this.ordenAscendente ? 1 : -1;
        return 0;
      });
    }
    return docs;
  }

  // APLICAR PAGINACIÓN A LOS FILTRADOS
  documentosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.documentosFiltrados.slice(inicio, fin);
  }

  // TOTAL DE PÁGINAS
  get totalPaginas(): number {
    return Math.ceil(this.documentosFiltrados.length / this.elementosPorPagina);
  }

  // Método para abrir el documento en una nueva pestaña
  abrirDocumento(doc: any) {
    const nombre = doc.archivoDocumento;                   // ej. "amava SAS.pdf"
    const ext = nombre.split('.').pop()?.toLowerCase() ?? '';

    // URL cruda del backend (se codifica una vez aquí)
    const urlBackend = 'http://localhost:8080/api/documentos/uploads/'
      + encodeURIComponent(nombre);

    /* PDFs → PDF.js */
    if (ext === 'pdf') {
      const urlViewer = '/assets/pdfjs/web/viewer.html?file='
        + encodeURIComponent(urlBackend);
      window.open(urlViewer, '_blank');
      return;
    }

    /* Otros → ruta visor Angular (DOCX, XLSX, imágenes, etc.) */
    window.open('/ver/' + nombre, '_blank');   // sin encode aquí
  }

  // Añade esta función dentro de tu export class
  getSortIcon(columna: string): string {
    if (this.columnaOrden !== columna) {
      return 'bi-arrow-down-up text-muted'; // Icono neutro si no está ordenada por aquí
    }
    // Retorna flecha arriba o abajo según el estado actual
    return this.ordenAscendente ? 'bi-sort-up text-primary' : 'bi-sort-down text-primary';
  }

}
