import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { MateriasService } from '../../core/services/materias.service';
import { SubirDocumentoComponent } from "./subir-documento/subir-documento.component";  // IMPORTANTE: importar tu servicio
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importa el sanitizer
import { DocumentosService } from '../../core/services/documentos.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Materia } from '../../core/models/materia.model';
import { Documento } from '../../core/models/documento.model';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, SubirDocumentoComponent, FormsModule],
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {


  semestre: number = 0;
  materias: Materia[] = [];

  modalVisible: boolean = false;
  materiaSeleccionada: Materia | null = null;

  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private materiaService: MateriasService,  // INYECTAMOS el servicio
    private sanitizer: DomSanitizer,
    private documentosService: DocumentosService,
  ) { }

  ngOnInit() {
    const idCarrera = localStorage.getItem('idCarrera');
    const semestreParam = this.route.snapshot.paramMap.get('semestre');
    this.semestre = semestreParam ? Number(semestreParam) : 0;

    if (!idCarrera) {
      console.warn('No hay id_carrera en localStorage');
      return;
    }

    this.materiaService.obtenerMateriasPorCarreraYSemestre(Number(idCarrera), this.semestre)
      .subscribe({
        next: (data) => {
          this.materias = data;
          this.materias.forEach(m => {
            m.filtroBusqueda = ''; this.getDocumentosByMateria(m.id_materia, m)
          });
        },
        error: (err) => {
          console.error('Error al obtener materias:', err);
        }
      });
  }

  getExtension(nombreArchivo: string): string {
    return nombreArchivo.split('.').pop()?.toLowerCase() || '';
  }


  getDocumentosByMateria(idMateria: number, materia: Materia) {
    this.materiaService.obtenerDocumentosPorMateria(idMateria)
      .subscribe(
        (documentos: Documento[]) => {
          console.log(`Documentos para materia ${idMateria}:`, documentos);
          materia.documentos = documentos.filter(doc => doc.estado === 1);// Asignamos los documentos a la materia con estado 1
        },
        (error: any) => {
          console.error('Error al obtener documentos de la materia', error);
        }
      );
  }

  // Abrir modal:
  abrirModal(materia: Materia | null) {
    this.materiaSeleccionada = materia;
    this.modalVisible = true;
    console.log('Abriendo modal para materia:', materia);
  }

  // Cerrar modal:
  cerrarModal() {
    this.modalVisible = false;
    this.materiaSeleccionada = null;
  }

  // MÉTODO NUEVO para construir URL de documento
  getUrlDocumento(nombreArchivo: string): string {
    const idUsuario = localStorage.getItem('id_usuario');
    let url = environment.uploadsBaseUrl + encodeURIComponent(nombreArchivo);

    if (idUsuario) {
      url += '?id_usuario=' + idUsuario;
    }

    return url;
  }


  // verDocumento(nombreArchivo: string) {
  //   const url = `http://localhost:8080/api/documentos/uploads/${encodeURIComponent(nombreArchivo)}`;
  //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `assets/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`
  //   );
  //   console.log('Abriendo visor para:', url);
  // }

  // Método para abrir el documento en una nueva pestaña
  abrirDocumento(doc: Documento) {
    const nombre = doc.archivoDocumento;                   // ej. "amava SAS.pdf"
    const ext = nombre.split('.').pop()?.toLowerCase() ?? '';

    // URL cruda del backend (se codifica una vez aquí)
    const urlBackend = environment.uploadsBaseUrl + encodeURIComponent(nombre);

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




  // Método para filtrar documentos por título o tema

  filtrarDocumentos(materia: Materia): Documento[] {
    const documentos = materia.documentos ?? [];
    if (!materia.filtroBusqueda || materia.filtroBusqueda.trim() === '') {
      return documentos;
    }

    const termino = materia.filtroBusqueda.toLowerCase();

    return documentos.filter(doc =>
      doc.tituloDocumento.toLowerCase().includes(termino) ||
      doc.temaDocumento.toLowerCase().includes(termino)
    );
  }

}
