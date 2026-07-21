import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { DocumentosService } from '../../core/services/documentos.service';
import { environment } from '../../../environments/environment';
import { DocumentoMasVisto } from '../../core/models/documento.model';

@Component({
  selector: 'app-mas-vistos',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './mas-vistos.component.html',
  styleUrl: './mas-vistos.component.css'
})
export class MasVistosComponent implements OnInit {

  documentosMasVistos: DocumentoMasVisto[] = [];
  readonly environment = environment;

  constructor(private documentosService: DocumentosService) { }

  ngOnInit() {
    this.documentosService.obtenerDocumentosMasVistos().subscribe({
      next: (data) => {
        this.documentosMasVistos = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  // ✅ ESTE MÉTODO DEBES CREARLO
  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }
}
