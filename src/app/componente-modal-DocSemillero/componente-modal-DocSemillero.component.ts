import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../services/documentos.service';
import Swal from 'sweetalert2'; // Importación para la alerta estilo la imagen

@Component({
  selector: 'app-componente-modal-doc-semillero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DocumentosService],
  templateUrl: './componente-modal-DocSemillero.component.html',
  styleUrls: ['./componente-modal-DocSemillero.component.css']
})
export class ComponenteModalDocSemilleroComponent implements OnInit {
  // Propiedades del formulario
  tituloDocumento: string = '';
  temaDocumento: string = '';
  categoriaDocumento: string = '';
  archivosSeleccionados: File[] = [];

  // Estados de control
  subiendo: boolean = false;
  categoriasDisponibles: string[] = ['Investigación', 'Formatos', 'Documentos', 'Otros'];

  // Comunicación con el componente padre
  @Input() semilleroId: number | null = null;
  @Output() documentoSubido = new EventEmitter<any>();

  constructor(private documentosService: DocumentosService) { }

  ngOnInit() {
    // Escucha cuando el modal se cierra (clic fuera, ESC o botones) para limpiar todo
    const modalElement = document.getElementById('modalDocSemillero');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetModal();
      });
    }
  }

  /**
   * Captura los archivos seleccionados desde el input
   */
  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.archivosSeleccionados = Array.from(files);
    }
  }

  /**
   * Lógica principal de subida
   */
  subirDocumento() {
    // Verificación de campos obligatorios para habilitar acción
    if (!this.tituloDocumento || !this.temaDocumento || !this.categoriaDocumento || this.archivosSeleccionados.length === 0) {
      return;
    }

    this.subiendo = true;
    const idUsuario = localStorage.getItem('id_usuario');

    const formData = new FormData();
    formData.append('titulo', this.tituloDocumento);
    formData.append('tema', this.temaDocumento);
    formData.append('categoria', this.categoriaDocumento);
    formData.append('id_usuario', idUsuario || '');
    formData.append('id_semillero', this.semilleroId?.toString() || '');

    this.archivosSeleccionados.forEach((archivo) => {
      formData.append('file', archivo, archivo.name);
    });

    this.documentosService.subirDocumentoSemillero(formData).subscribe({
      next: (docSubido) => {
        this.subiendo = false;

        // 1. Cerramos el modal de Bootstrap primero
        this.cerrarModalProgramaticamente();

        // 2. Mostramos la alerta estilo SweetAlert2 igual a tu imagen
        Swal.fire({
          title: '¡Subido!',
          text: 'El documento fue cargado correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          heightAuto: false // Evita saltos visuales en el scroll
        });

        // 3. Notificamos al padre para recargar la tabla
        this.documentoSubido.emit(docSubido);
      },
      error: (err) => {
        this.subiendo = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo completar la carga del archivo.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
        console.error('Error en upload:', err);
      }
    });
  }

  /**
   * Limpia todas las variables y el input físico
   */
  resetModal() {
    this.tituloDocumento = '';
    this.temaDocumento = '';
    this.categoriaDocumento = '';
    this.archivosSeleccionados = [];
    this.subiendo = false;

    // Resetear el input file para que permita volver a seleccionar el mismo archivo
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /**
   * Cierra el modal usando la API de Bootstrap 5
   */
  cerrarModalProgramaticamente() {
    const modalElement = document.getElementById('modalDocSemillero');
    if (modalElement && (window as any).bootstrap) {
      const modalInstance = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  }

  /**
   * Permite quitar archivos de la lista antes de subir
   */
  quitarArchivo(i: number) {
    this.archivosSeleccionados.splice(i, 1);
  }
}