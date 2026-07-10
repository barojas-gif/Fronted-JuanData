import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-componente-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './componente-login.component.html',
  styleUrls: ['./componente-login.component.css']
})
export class ComponenteLoginComponent {
  loginForm: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correoUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { correoUsuario, contrasenaUsuario } = this.loginForm.value;
  
      console.log('Enviando login con:', { correoUsuario, contrasenaUsuario });
  
      this.authService.login(correoUsuario, contrasenaUsuario).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
  
          // Guardar el token, id y nombre
          this.authService.guardarToken(res.token, res.idUsuario, res.nombreUsuario);
  
          // Guardar idCarrera en localStorage
          localStorage.setItem('idCarrera', res.idCarrera);
  
          // Verificar que se guardó correctamente
          const idUsuario = this.authService.obtenerIdUsuario();
          if (idUsuario) {
            console.log('idUsuario disponible:', idUsuario);
          } else {
            console.warn('No se pudo obtener el idUsuario del token');
          }
  
          // Redirección según si la contraseña es temporal
          if (res.temporal) {
            this.router.navigate(['/actualizar-contrasena']);
          } else {
            this.router.navigate(['/Inicio']);
          }
        },
        error: (err) => {
          console.error('Login fallido:', err);
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Usuario o contraseña inválidos. Por favor verifica tus datos.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
  

  onCreateAccount() {
    alert('Funcionalidad de crear cuenta aún no implementada.');
  }

  onForgotPassword() {
    alert('Funcionalidad de recuperar contraseña aún no implementada.');
  }
}
