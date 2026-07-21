import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioDTO, UsuarioSimpleDTO } from '../../core/models/usuario.dto';
import { UsuariosService } from '../../core/services/usuarios.service';
import { SemilleroService } from '../../core/services/semillero.service';
import { Rol } from '../../core/models/rol.model';
import { Carrera } from '../../core/models/carrera.model';
import { Semillero } from '../../core/models/semillero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent
  implements OnInit, OnChanges {
  semillerosCargados = false;


  @Input() mostrar = false;
  @Input() usuarioExistente?: UsuarioSimpleDTO;

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardarUsuario = new EventEmitter<UsuarioDTO>();

  correoExiste = false;
  documentoExiste = false;

  id_rol: string = '';
  id_carrera: string = '';
  id_semillero: number | null = null;

  private semilleroPendiente: number | null = null;

  nombre_usuario = '';
  apellido_usuario = '';
  telefono_usuario = '';
  documento_usuario = '';
  correo_usuario = '';
  contrasena_usuario = '';

  roles: Rol[] = [];
  carreras: Carrera[] = [];
  semilleros: Semillero[] = [];
  semillerosFiltrados: Semillero[] = [];

  constructor(
    private usuarioService: UsuariosService,
    private semilleroService: SemilleroService
  ) { }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('USUARIO COMPLETO:', this.usuarioExistente);

    if (changes['mostrar'] && this.mostrar) {
      this.cargarDatosIniciales();

      if (!this.usuarioExistente) {
        this.limpiarFormulario();
      }
    }
  }


  cargarDatosIniciales() {

    this.usuarioService.listarCarreras().subscribe(data => {
      this.carreras = data;
    });


    this.usuarioService.listarRoles().subscribe(data => {
      this.roles = data;
    });


    this.semilleroService.getTodosSemilleros().subscribe({
      next: data => {
        this.semilleros = data;
        this.semillerosCargados = true;


        if (this.usuarioExistente) {
          this.asignarDatosEdicion();
        }
      },
      error: err => console.error('Error cargando semilleros', err)
    });

  }

  asignarDatosEdicion() {
    if (!this.usuarioExistente) return;

    const u = this.usuarioExistente;

    this.nombre_usuario = u.nombre_usuario || '';
    this.apellido_usuario = u.apellido_usuario || '';
    this.documento_usuario = u.documento_usuario || '';
    this.telefono_usuario = u.telefono_usuario || '';
    this.correo_usuario = u.correo_usuario || '';

    this.id_rol = u.id_rol != null ? String(u.id_rol) : '';
    this.id_carrera = u.id_carrera != null ? String(u.id_carrera) : '';
    this.id_semillero = u.id_semillero != null ? Number(u.id_semillero) : null;

    console.log('ID SEMILLERO USUARIO:', this.id_semillero);

    this.filtrarSemilleros();

    console.log(
      'IDS DISPONIBLES:',
      this.semillerosFiltrados.map(s => s.id)
    );

    this.correoExiste = false;
    this.documentoExiste = false;
  }


  validarCorreo() {
    // Solo dispara la petición si parece un correo o tiene longitud mínima
    if (this.correo_usuario.length < 5) return;

    if (this.usuarioExistente && this.correo_usuario === this.usuarioExistente.correo_usuario) {
      this.correoExiste = false;
      return;
    }

    this.usuarioService.verificarCorreoExiste(this.correo_usuario).subscribe({
      next: (existe) => this.correoExiste = existe,
      error: (err) => {
        console.error("Error validando correo:", err);
        // Si da 403, puede que el interceptor de JWT no esté enviando el token
      }
    });
  }

  // modal-usuario.component.ts

  validarDocumento() {
    if (this.documento_usuario.length < 5) return;

    this.usuarioService.verificarDocumentoExiste(this.documento_usuario).subscribe({
      next: (existe) => {
        this.documentoExiste = existe;
      },
      error: (err) => {
        // Si da 403, ponemos false para que NO bloquee el botón de guardado
        this.documentoExiste = false;
        console.warn("Validación bloqueada por el servidor (403). Se permite continuar.");
      }
    });
  }

  soloNumeros(event: any, campo: 'documento' | 'telefono') {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    if (campo === 'documento') this.documento_usuario = valor;
    if (campo === 'telefono') this.telefono_usuario = valor;
    event.target.value = valor;
  }

  filtrarSemilleros() {
    if (!this.id_carrera || !this.semilleros.length) {
      this.semillerosFiltrados = [];
      return;
    }

    this.semillerosFiltrados = this.semilleros.filter(s =>
      String(s.carrera?.idCarrera) === String(this.id_carrera)
    );
  }

  formInvalido(): boolean {
    const textosOk =
      !!this.nombre_usuario.trim() &&
      !!this.apellido_usuario.trim() &&
      !!this.documento_usuario.trim() &&
      !!this.correo_usuario.trim();

    const selectoresOk = !!this.id_rol && !!this.id_carrera;
    const hayDuplicados = this.correoExiste || this.documentoExiste;
    const passwordOk = this.usuarioExistente
      ? true
      : !!this.contrasena_usuario;

    return !textosOk || !selectoresOk || hayDuplicados || !passwordOk;
  }

  limpiarFormulario() {
    this.nombre_usuario = '';
    this.apellido_usuario = '';
    this.documento_usuario = '';
    this.telefono_usuario = '';
    this.correo_usuario = '';
    this.contrasena_usuario = '';

    this.id_rol = '';
    this.id_carrera = '';
    this.id_semillero = null;
    this.semilleroPendiente = null;

    this.correoExiste = false;
    this.documentoExiste = false;
    this.semillerosFiltrados = [];
  }



  guardar() {
    if (this.formInvalido()) return;

    const usuarioDTO: UsuarioDTO = {
      nombre_usuario: this.nombre_usuario,
      apellido_usuario: this.apellido_usuario,
      correo_usuario: this.correo_usuario,
      documento_usuario: this.documento_usuario,
      telefono_usuario: this.telefono_usuario,
      id_rol: Number(this.id_rol),
      id_carrera: Number(this.id_carrera),
      id_semillero: this.id_semillero
    };

    // 1. Verificar si es edición o creación
    if (this.usuarioExistente?.id_usuario) {
      // Si existe, usamos actualizarUsuario
      this.usuarioService.actualizarUsuario(this.usuarioExistente.id_usuario, usuarioDTO).subscribe({
        next: () => this.notificarExito('Usuario actualizado'),
        error: (err) => console.error(err)
      });
    } else {
      // Si es nuevo, usamos crearUsuario
      usuarioDTO.contrasena_usuario = this.contrasena_usuario;
      this.usuarioService.crearUsuario(usuarioDTO).subscribe({
        next: () => this.notificarExito('Usuario registrado'),
        error: (err) => console.error(err)
      });
    }
  }

  // Función auxiliar para SweetAlert2
  notificarExito(mensaje: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: mensaje,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
    this.cerrar.emit();
    if (!this.usuarioExistente) this.limpiarFormulario();
  }
  onCarreraChange() {
    this.id_semillero = null;
    this.filtrarSemilleros();
  }


}
