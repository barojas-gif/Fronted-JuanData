import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SemestreComponent } from '../semestre/semestre.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inicio-estudiantes',
  standalone: true,
  imports: [MenuComponent, SemestreComponent],
  templateUrl: './inicio-estudiantes.component.html',
  styleUrl: './inicio-estudiantes.component.css'
})
export class InicioEstudiantesComponent implements OnInit {
  nombreUsuario: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // El nombre se sigue obteniendo, pero ahora el Menú lo muestra en la franja azul
    this.nombreUsuario = this.authService.obtenerNombreUsuario();
  }
}