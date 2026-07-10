import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-actualizar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './componente-actualizar-contrasena.component.html',
  styleUrl: './componente-actualizar-contrasena.component.css'
})
export class ComponenteActualizarContrasenaComponent {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  mostrarNueva: boolean = false;
  mostrarConfirmar: boolean = false;

  get contrasenasNoCoinciden(): boolean {
    return !!this.nuevaContrasena && !!this.confirmarContrasena && this.nuevaContrasena !== this.confirmarContrasena;
  }

  constructor(private authService: AuthService, private router: Router) {}

  actualizarContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      Swal.fire('Campos vacíos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    const idUsuario = this.authService.obtenerIdUsuario();

    if (!idUsuario) {
      Swal.fire('Error', 'No se pudo obtener el usuario.', 'error');
      return;
    }

    console.log('Contraseña enviada al backend:', this.nuevaContrasena);

    this.authService.actualizarContrasena(this.nuevaContrasena).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: res.mensaje || 'Tu nueva contraseña ha sido registrada correctamente.',
          confirmButtonColor: '#3A3EFF'
        }).then(() => {
          this.authService.cerrarSesion();
          this.router.navigate(['/login']);
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la contraseña.', 'error');
      }
    });
  }
}
