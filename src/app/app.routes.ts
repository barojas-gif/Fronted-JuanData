import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ComponenteLoginComponent } from './componente-login/componente-login.component';
import { ComponenteInicioEstudiantesComponent } from './componente-inicio-estudiantes/componente-inicio-estudiantes.component';
import { ComponenteMenuComponent } from './componente-menu/componente-menu.component';
import { ComponenteSemestreComponent } from './componente-semestre/componente-semestre.component';
import { ComponenteMateriaComponent } from './componente-materia/componente-materia.component';
import { ComponenteVerDocumentoComponent } from './componente-ver-documento/componente-ver-documento.component';
import { ComponenteMasVistosComponent } from './componente-mas-vistos/componente-mas-vistos.component';
import { ComponenteArchivosPendientesComponent } from './componente-archivos-pendientes/componente-archivos-pendientes.component';
import { ComponenteArchivosAceptadosComponent } from './componente-archivos-aceptados/componente-archivos-aceptados.component';
import { ComponenteAdministracionUsuariosComponent } from './componente-administracion-usuarios/componente-administracion-usuarios.component';
import { ComponenteModalMensajeComponent } from './componente-modal-mensaje/componente-modal-mensaje.component';
import { ComponenteModalUsuarioComponentComponent } from './componente-modal-usuario-component/componente-modal-usuario-component.component';
import { ComponenteRecuperarContrasenaComponent } from './componente-recuperar-contrasena/componente-recuperar-contrasena.component';
import { ComponenteRegistrarUsuarioComponent } from './componente-registrar-usuario/componente-registrar-usuario.component';
import { ComponenteActualizarContrasenaComponent } from './componente-actualizar-contrasena/componente-actualizar-contrasena.component';
import { ComponenteSemilleroComponent } from './componente-semillero/componente-semillero.component';



export const routes: Routes = [
    { path: '', component: ComponenteLoginComponent },
    { path: 'Inicio', component: ComponenteInicioEstudiantesComponent, canActivate: [AuthGuard] },
    { path: 'Menu', component: ComponenteMenuComponent, canActivate: [AuthGuard] },
    { path: 'Semestre', component: ComponenteSemestreComponent, canActivate: [AuthGuard] },
    { path: 'Materia/:semestre', component: ComponenteMateriaComponent, canActivate: [AuthGuard] },
    { path: 'ver/:nombreArchivo', component: ComponenteVerDocumentoComponent, canActivate: [AuthGuard] },
    { path: 'ver-documento/:nombreArchivo', component: ComponenteVerDocumentoComponent, canActivate: [AuthGuard] },
    { path: 'ver-documento/:nombreArchivo', component: ComponenteVerDocumentoComponent, canActivate: [AuthGuard] },
    { path: 'MasVistos', component: ComponenteMasVistosComponent, canActivate: [AuthGuard] },
    { path: 'ArchivosPendientes', component: ComponenteArchivosPendientesComponent, canActivate: [AuthGuard] },
    { path: 'ArchivosAceptados', component: ComponenteArchivosAceptadosComponent, canActivate: [AuthGuard] },
    { path: 'AdministracionUsuarios', component: ComponenteAdministracionUsuariosComponent, canActivate: [AuthGuard] },
    { path: 'RegistrarUsuario', component: ComponenteRegistrarUsuarioComponent },
    { path: 'RecuperarContrasena', component: ComponenteRecuperarContrasenaComponent },
    { path: 'semillero', component: ComponenteSemilleroComponent, canActivate: [AuthGuard] },
    {
      path: 'actualizar-contrasena',
      loadComponent: () =>
        import('./componente-actualizar-contrasena/componente-actualizar-contrasena.component')
          .then(m => m.ComponenteActualizarContrasenaComponent)
    },
    
    
  
    // Modal components no necesitan protección
    { path: 'ModalMensajes', component: ComponenteModalMensajeComponent },
    { path: 'ModalUsuario', component: ComponenteModalUsuarioComponentComponent },
  
    // Ruta para errores o rutas desconocidas
    { path: '**', redirectTo: '' }
  ];
  
