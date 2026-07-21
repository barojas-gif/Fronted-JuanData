import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Carrera } from '../../core/models/carrera.model';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit {
  registroForm!: FormGroup;
  listaCarreras: Carrera[] = [];
  registrando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      numeroDocumento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      correoUsuario: ['', Validators.required],
      idCarrera: ['', Validators.required],
    });

    this.usuariosService.listarCarreras().subscribe({
      next: (data) => {
        console.log('Carreras recibidas:', data);
        this.listaCarreras = data;
      },
      error: (err) => {
        console.error('Error al cargar carreras:', err);
      }
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.registrando = true;

      const formulario = this.registroForm.value;
      const correoCompleto = formulario.correoUsuario + '@jdc.edu.co';

      const datosFinales = {
        numeroDocumento: formulario.numeroDocumento,
        nombreUsuario: formulario.nombreUsuario,
        apellidoUsuario: formulario.apellidoUsuario,
        numeroTelefono: formulario.numeroTelefono,
        correoUsuario: correoCompleto,
        idCarrera: formulario.idCarrera,
      };

      console.log('Datos a enviar:', datosFinales);

      this.authService.register(datosFinales).subscribe({
        next: (res: any) => {
          this.registrando = false;
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Revisa tu correo institucional para confirmar el registro.',
            timer: 2000,
            confirmButtonColor: '#3A3EFF'
          });
          this.registroForm.reset();
        },
        error: (err: any) => {
          this.registrando = false;
          const mensaje = typeof err?.error === 'string' ? err.error : 'Hubo un error en el registro';
          console.error('Error al registrar:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: mensaje,
            confirmButtonColor: '#3A3EFF'
          });
        }
      });

    } else {
      console.log('Formulario inválido');
    }
  }
}
