import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { InicioEstudiantesComponent } from './features/inicio-estudiantes/inicio-estudiantes.component';
import { MenuComponent } from './features/menu/menu.component';
import { SemestreComponent } from './features/semestre/semestre.component';
import { MateriaComponent } from './features/materia/materia.component';
import { VerDocumentoComponent } from './features/ver-documento/ver-documento.component';
import { MasVistosComponent } from './features/mas-vistos/mas-vistos.component';
import { ArchivosPendientesComponent } from './features/archivos-pendientes/archivos-pendientes.component';
import { ArchivosAceptadosComponent } from './features/archivos-aceptados/archivos-aceptados.component';
import { AdministracionUsuariosComponent } from './features/administracion-usuarios/administracion-usuarios.component';
import { ModalMensajeComponent } from './shared/modal-mensaje/modal-mensaje.component';
import { ModalUsuarioComponent } from './shared/modal-usuario/modal-usuario.component';
import { RecuperarContrasenaComponent } from './features/recuperar-contrasena/recuperar-contrasena.component';
import { RegistrarUsuarioComponent } from './features/registrar-usuario/registrar-usuario.component';
import { SemilleroComponent } from './features/semillero/semillero.component';



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'Inicio', component: InicioEstudiantesComponent, canActivate: [AuthGuard] },
    { path: 'Menu', component: MenuComponent, canActivate: [AuthGuard] },
    { path: 'Semestre', component: SemestreComponent, canActivate: [AuthGuard] },
    { path: 'Materia/:semestre', component: MateriaComponent, canActivate: [AuthGuard] },
    { path: 'ver/:nombreArchivo', component: VerDocumentoComponent, canActivate: [AuthGuard] },
    { path: 'ver-documento/:nombreArchivo', component: VerDocumentoComponent, canActivate: [AuthGuard] },
    { path: 'MasVistos', component: MasVistosComponent, canActivate: [AuthGuard] },
    { path: 'ArchivosPendientes', component: ArchivosPendientesComponent, canActivate: [AuthGuard] },
    { path: 'ArchivosAceptados', component: ArchivosAceptadosComponent, canActivate: [AuthGuard] },
    { path: 'AdministracionUsuarios', component: AdministracionUsuariosComponent, canActivate: [AuthGuard] },
    { path: 'RegistrarUsuario', component: RegistrarUsuarioComponent },
    { path: 'RecuperarContrasena', component: RecuperarContrasenaComponent },
    { path: 'semillero', component: SemilleroComponent, canActivate: [AuthGuard] },
    {
      path: 'actualizar-contrasena',
      loadComponent: () =>
        import('./features/actualizar-contrasena/actualizar-contrasena.component')
          .then(m => m.ActualizarContrasenaComponent)
    },

    // Modal components no necesitan protección
    { path: 'ModalMensajes', component: ModalMensajeComponent },
    { path: 'ModalUsuario', component: ModalUsuarioComponent },

    // Ruta para errores o rutas desconocidas
    { path: '**', redirectTo: '' }
  ];
