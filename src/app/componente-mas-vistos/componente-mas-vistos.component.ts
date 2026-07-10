import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteMenuComponent } from "../componente-menu/componente-menu.component";
import { DocumentosService } from '../services/documentos.service';

@Component({
  selector: 'app-componente-mas-vistos',
  standalone: true,
  imports: [CommonModule, ComponenteMenuComponent],
  templateUrl: './componente-mas-vistos.component.html',
  styleUrl: './componente-mas-vistos.component.css'
})
export class ComponenteMasVistosComponent implements OnInit {

  documentosMasVistos: any[] = [];

  constructor(private documentosService: DocumentosService) {}

  ngOnInit() {
    this.documentosService.obtenerDocumentosMasVistos().subscribe({
      next: (data: any[]) => {
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
