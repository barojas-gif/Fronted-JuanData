import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, NgIf } from '@angular/common';
import { ComponenteMenuComponent } from '../componente-menu/componente-menu.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-componente-ver-documento',
  standalone: true,
  imports: [CommonModule, NgIf, ComponenteMenuComponent],
  templateUrl: './componente-ver-documento.component.html',
  styleUrls: ['./componente-ver-documento.component.css']
})
export class ComponenteVerDocumentoComponent implements AfterViewInit {
  nombreArchivo = '';
  fileUrl = '';
  ext = '';
  iframeUrl: SafeResourceUrl | null = null;
  esImg = false;

  @ViewChild('contenedor', { static: true }) contenedor!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  descargarArchivo() {
    const link = document.createElement('a');
    link.href = this.fileUrl;
    link.download = this.nombreArchivo;
    link.target = '_blank';
    link.click();
  }

  async ngAfterViewInit() {
    document.addEventListener('contextmenu', e => e.preventDefault());

    const nombre = this.route.snapshot.paramMap.get('nombreArchivo')!;
    if (!nombre) return;

    this.nombreArchivo = decodeURIComponent(nombre);
    this.fileUrl = `${environment.uploadsBaseUrl}${encodeURIComponent(nombre)}`;
    this.ext = nombre.split('.').pop()?.toLowerCase() ?? '';

    if (this.ext === 'pdf') {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `/assets/pdfjs/web/viewer.html?file=${encodeURIComponent(this.fileUrl)}`
      );
      return;
    }

    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(this.ext)) {
      this.esImg = true;
      return;
    }

    if (this.ext === 'docx') {
      await this.renderDocx();
      return;
    }

    if (this.ext === 'xlsx') {
      await this.renderXlsx();
      return;
    }

    if (this.ext === 'pptx') {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(this.fileUrl)}`
      );
      return;
    }

    // Para otros archivos no soportados
    this.contenedor.nativeElement.innerHTML =
      `<p style="color:red">Vista previa no soportada para “.${this.ext}”.</p>`;

    const el = this.contenedor.nativeElement;
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }
    });

    document.addEventListener('keydown', (e) => {
      const forbiddenKeys = ['s', 'p', 'u', 'c', 'a'];
      if ((e.ctrlKey || e.metaKey) && forbiddenKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
      }
    });
  }

  /* ======== DOCX: Carga diferida de Mammoth ========= */
  private async renderDocx() {
    const [buf, mammoth] = await Promise.all([
      fetch(this.fileUrl).then(r => r.arrayBuffer()),
      import('mammoth')
    ]);
    const { value } = await mammoth.convertToHtml({ arrayBuffer: buf });
    this.contenedor.nativeElement.innerHTML = value;
  }

  /* ======== XLSX: Carga diferida de XLSX ========= */
  private async renderXlsx() {
    const [buf, XLSX] = await Promise.all([
      fetch(this.fileUrl).then(r => r.arrayBuffer()),
      import('xlsx')
    ]);
    const wb = XLSX.read(buf, { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const html = XLSX.utils.sheet_to_html(sheet, { id: 'tbl' });
    this.contenedor.nativeElement.innerHTML = html;
  }
}