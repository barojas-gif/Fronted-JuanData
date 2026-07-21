import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  usuario: string = '';
  recuperando: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  recuperar() {
    if (!this.usuario.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor, ingresa tu correo o usuario.',
        confirmButtonColor: '#3A3EFF'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }
    this.recuperando = true;
    this.authService.recuperarContrasena(this.usuario).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha enviado una contraseña temporal a tu correo.',
          confirmButtonColor: '#3A3EFF'
        }).then(() => {
          this.router.navigate(['/login']);
        });
        this.usuario = '';
        this.recuperando = false;
      },
      error: (err) => {
        this.recuperando = false;
        if (err.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'El usuario no está registrado.',
            confirmButtonColor: '#3A3EFF'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar recuperar la contraseña.',
            confirmButtonColor: '#3A3EFF'
          });
        }
      }
    });
  }
}
