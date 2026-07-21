import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../../core/services/documentos.service';
import { AuthService } from '../../../core/services/auth.service'; // <-- Importa tu AuthService
import { Materia } from '../../../core/models/materia.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-subir-documento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-documento.component.html',
  styleUrls: ['./subir-documento.component.css']
})
export class SubirDocumentoComponent {

  subiendo: boolean = false;

  @Input() visible: boolean = false;
  @Input() materia: Materia | null = null;
  @Input() materias: Materia[] = [];

  @Output() cerrarModal = new EventEmitter<void>();

  temaDocumento: string = '';
  nombreDocumento: string = '';
  archivoSeleccionado: File | null = null;
  materiaSeleccionadaId: number | null = null;

  constructor(
    private documentosService: DocumentosService,
    private authService: AuthService // <-- Inyecta el AuthService
  ) { }

  cerrar() {
    this.cerrarModal.emit();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const archivo = event.dataTransfer.files[0];
      if (!this.validarArchivo(archivo)) return; // <-- Validación
      this.archivoSeleccionado = archivo;
      console.log('Archivo seleccionado (drag-drop):', this.archivoSeleccionado);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const archivo = target.files[0];
      if (!this.validarArchivo(archivo)) return; // <-- Validación
      this.archivoSeleccionado = archivo;
      console.log('Archivo seleccionado (click):', this.archivoSeleccionado);
    }
  }


  // Función de validación
  validarArchivo(archivo: File): boolean {
    const extensionesPermitidas = ['pdf', 'doc', 'docx'];
    const nombreArchivo = archivo.name.toLowerCase();
    const extension = nombreArchivo.split('.').pop();

    if (!extension || !extensionesPermitidas.includes(extension)) {
      Swal.fire({
        icon: 'warning',
        title: 'Archivo no permitido',
        text: 'Solo se pueden subir archivos PDF o Word (.pdf, .doc, .docx).',
        timer: 2000,
        confirmButtonColor: '#3A3EFF'
      });
      return false;
    }
    return true;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  subirDocumento() {
    // Validación: ¿tema del documento?
    if (!this.temaDocumento) {
      Swal.fire({
        icon: 'warning',
        title: 'Tema requerido',
        timer: 2000,
        text: 'Por favor ingresa un tema para el documento.',
        confirmButtonColor: '#3A3EFF',
      });
      return;
    }
    // Validación: ¿nombre del documento?
    if (!this.nombreDocumento) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        timer: 2000,
        text: 'Por favor ingresa un nombre para el documento.',
        confirmButtonColor: '#3A3EFF',
      });
      return;
    }

    // Validación: ¿materia seleccionada?
    if (!this.materiaSeleccionadaId) {
      Swal.fire({
        icon: 'warning',
        title: 'Materia requerida',
        timer: 2000,
        text: 'Por favor selecciona una materia.',
        confirmButtonColor: '#3A3EFF',
      });
      return;
    }

    // Validación: ¿archivo seleccionado?
    if (!this.archivoSeleccionado) {
      Swal.fire({
        icon: 'warning',
        title: 'Archivo requerido',
        timer: 2000,
        text: 'Por favor selecciona un archivo para subir.',
        confirmButtonColor: '#3A3EFF',
      });
      return;
    }

    // Validación: ¿usuario autenticado?
    const idUsuario = this.authService.obtenerIdUsuario();
    if (!idUsuario) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no identificado',
        text: 'No se pudo obtener el ID del usuario. Intenta iniciar sesión de nuevo.',
        confirmButtonColor: '#3A3EFF'
      });
      return;
    }

    // No subir si ya se está subiendo
    if (this.subiendo) return;
    this.subiendo = true;

    // Datos listos
    console.log('Subiendo documento:', {
      tema: this.temaDocumento,
      nombre: this.nombreDocumento,
      archivo: this.archivoSeleccionado,
      materiaSeleccionadaId: this.materiaSeleccionadaId
    });
    // Preparar FormData
    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);
    formData.append('titulo', this.nombreDocumento);
    formData.append('tema', this.temaDocumento);
    formData.append('fecha', new Date().toISOString().split('T')[0]); // yyyy-MM-dd
    formData.append('id_usuario', idUsuario);
    formData.append('id_materia', this.materiaSeleccionadaId.toString());

    // Enviar al servicio
    this.documentosService.crearDocumento(formData).subscribe({
      next: (response) => {
        console.log('Documento subido exitosamente:', response);
        Swal.fire({
          icon: 'success',
          title: 'Documento subido',
          timer: 2000,
          text: response.message || 'El documento se subió exitosamente.',
          confirmButtonColor: '#3A3EFF'
        });
        this.subiendo = false;
        this.cerrar();
      },
      error: (error) => {
        console.error('Error al subir documento:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al subir',
          text: error?.error?.message || 'Ocurrió un error inesperado.',
          timer: 2000,
          confirmButtonColor: '#3A3EFF'
        });
        this.subiendo = false;
      }
    });
  }

  isFormValid(): boolean {
    return (
      this.temaDocumento.trim() !== '' &&
      this.nombreDocumento.trim() !== '' &&
      this.materiaSeleccionadaId !== null &&
      this.archivoSeleccionado !== null
    );
  }

}