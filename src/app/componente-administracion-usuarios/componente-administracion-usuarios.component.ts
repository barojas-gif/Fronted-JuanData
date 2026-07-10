import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteMenuComponent } from "../componente-menu/componente-menu.component";
import { UsuarioService } from '../services/usuarios.service';
import { ComponenteModalUsuarioComponentComponent } from "../componente-modal-usuario-component/componente-modal-usuario-component.component";
import { UsuarioDTO } from '../DTO/usuario.dto';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-componente-administracion-usuarios',
  standalone: true,
  imports: [ComponenteMenuComponent, CommonModule, ComponenteModalUsuarioComponentComponent, FormsModule],
  templateUrl: './componente-administracion-usuarios.component.html',
  styleUrls: ['./componente-administracion-usuarios.component.css']
})
export class ComponenteAdministracionUsuariosComponent implements OnInit {

  listaUsuarios : any []= [];
  rolUsuario: string = '';
  terminoBusqueda: string = '';
  paginaActual: number = 1;
  elementosPorPagina: number = 5;

  // Estas propiedades hacen posible abrir y controlar el modal
  mostrarModal = false;
  accionModal: 'Editar Usuario' | 'Nuevo Usuario' = 'Nuevo Usuario';

    usuarioSeleccionado?: UsuarioDTO = undefined;

    abrirModal(usuario?: UsuarioDTO) {
      if (usuario) {
        this.accionModal = 'Editar Usuario';
        
        // Pedir los datos completos del usuario desde el backend
        this.usuariosService.obtenerUsuarioPorId(usuario.id_usuario!).subscribe({
          next: (usuarioCompleto) => {
            this.usuarioSeleccionado = usuarioCompleto; // Carga datos completos en el modal
            this.mostrarModal = true;
          },
          error: (err) => {
            console.error('Error al obtener datos completos del usuario:', err);
          }
        });
        
      } else {
        this.accionModal = 'Nuevo Usuario';
        this.usuarioSeleccionado = undefined;
        this.mostrarModal = true;
      }
    }
    
    
  
    

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = undefined;
    setTimeout(() => {
      this.cargarUsuarios();
    }, 300);
  }

  guardarUsuario(usuario: UsuarioDTO) {
    if (this.usuarioSeleccionado) {
      // Edición
      this.usuariosService.actualizarUsuario(this.usuarioSeleccionado.id_usuario!, usuario).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarUsuarios();
        },
        error: err => console.error('Error al actualizar usuario:', err)
      });
    } else {
      // Nuevo
      this.usuariosService.crearUsuario(usuario).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarUsuarios();
        },
        error: err => console.error('Error al crear usuario:', err)
      });
    }
  }

  
  
  constructor(private usuariosService: UsuarioService){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.initRolUsuario();
  }

  private initRolUsuario(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.rolUsuario = (decoded.rol || '').trim().toLowerCase();
      console.log("ROL DETECTADO (semillero):", this.rolUsuario);
    }
  }

  esEstudiante(): boolean {
    return this.rolUsuario === 'estudiante';
  }

  esAdministrador(): boolean {
    return this.rolUsuario === 'administrador';
  }

  esDocente(): boolean {
    return this.rolUsuario === 'docente';
  }

cargarUsuarios() {
  this.usuariosService.listarUsuariosPorCarreraDelAdmin().subscribe({
    next: (data) => {
      this.listaUsuarios = data;
    },
    error: (err) => {
      console.error("Error al cargar usuarios filtrados por carrera del admin", err);
    }
  });
}


  desactivarUsuario(usuario: any) {
    Swal.fire({
      title: `¿Desactivar a ${usuario.nombre_usuario}?`,
      text: "Esta acción desactivará al usuario y no podrá iniciar sesión.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivarUsuario(usuario.id_usuario).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario desactivado',
              text: `${usuario.nombre_usuario} ha sido desactivado correctamente.`,
              timer: 2000,
              showConfirmButton: false
            });
            this.cargarUsuarios(); // refresca la lista
          },
          error: (err) => {
            console.error("Error al desactivar usuario:", err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al desactivar el usuario.',
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Operación cancelada',
          text: 'El usuario no fue desactivado.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
  

  // REINICIAR PAGINACIÓN AL CAMBIAR TÉRMINO
  onBuscarCambio() {
    this.paginaActual = 1;
  }

  reiniciarPagina() {
    this.paginaActual = 1;
  }
  
  //Filtro de busqueda
  get usuariosFiltrados(): any[] {
    let usuarios = [...this.listaUsuarios];
    // Orden descendente por id_usuario
    usuarios.sort((a, b) => (b.id_usuario || 0) - (a.id_usuario || 0));
    if (!this.terminoBusqueda.trim()) {
      return usuarios;
    }
    const termino = this.terminoBusqueda.toLowerCase();
    return usuarios.filter(usuario =>
      (usuario.nombre_usuario?.toLowerCase() ?? '').includes(termino) ||
      (usuario.apellido_usuario?.toLowerCase() ?? '').includes(termino) ||
      (usuario.nombre_carrera?.toLowerCase() ?? '').includes(termino) ||
      (usuario.telefono_usuario?.toLowerCase() ?? '').includes(termino) ||
      (usuario.documento_usuario?.toLowerCase() ?? '').includes(termino) ||
      (usuario.nombre_rol?.toLowerCase() ?? '').includes(termino)
    );
  }

  // APLICAR PAGINACIÓN A LOS FILTRADOS
  usuariosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.usuariosFiltrados.slice(inicio, fin);
  }

  // TOTAL DE PÁGINAS
  get totalPaginas(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.elementosPorPagina);
  }
  
}
