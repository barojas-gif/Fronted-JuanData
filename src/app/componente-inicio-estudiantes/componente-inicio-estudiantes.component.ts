import { Component, OnInit } from '@angular/core';
import { ComponenteMenuComponent } from '../componente-menu/componente-menu.component';
import { ComponenteSemestreComponent } from '../componente-semestre/componente-semestre.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-componente-inicio-estudiantes',
  standalone: true,
  imports: [ComponenteMenuComponent, ComponenteSemestreComponent],
  templateUrl: './componente-inicio-estudiantes.component.html',
  styleUrl: './componente-inicio-estudiantes.component.css'
})
export class ComponenteInicioEstudiantesComponent implements OnInit {
  nombreUsuario: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // El nombre se sigue obteniendo, pero ahora el Menú lo muestra en la franja azul
    this.nombreUsuario = this.authService.obtenerNombreUsuario();
  }
}