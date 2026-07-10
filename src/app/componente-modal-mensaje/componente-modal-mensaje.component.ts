import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente-modal-mensaje',
  standalone: true,
  templateUrl: './componente-modal-mensaje.component.html',
  styleUrls: ['./componente-modal-mensaje.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ComponenteModalMensajeComponent {
  @Input() mostrar = false;
  @Input() tipo: 'aceptar' | 'rechazar' = 'aceptar';
  @Input() idDocumento!: number;
  @Input() correoEstudiante!: string;

  @Output() cerrar = new EventEmitter<void>();
  // Cambiamos 'enviar' por 'enviarConfirmado' para que el padre lo escuche
  @Output() enviarConfirmado = new EventEmitter<{id: number, mensaje: string, tipo: string}>();

  mensaje: string = '';
  enviando: boolean = false;

  enviarMensaje() {
    if (this.mensaje.trim()) { 
      // IMPORTANTE: Aquí NO ponemos enviando = false ni cerramos el modal.
      // Eso lo hará el padre cuando el servidor responda OK.
      this.enviando = true;

      // Emitimos el objeto que el Padre espera
      this.enviarConfirmado.emit({
        id: this.idDocumento,
        mensaje: this.mensaje,
        tipo: this.tipo
      });
      
      // Limpiamos el mensaje para la próxima vez
      this.mensaje = '';
    }
  }

  // Este método lo llamaremos desde el padre si hay un error para desbloquear el botón
  resetearEstado() {
    this.enviando = false;
  }

  cerrarModal() {
    if (!this.enviando) {
      this.mensaje = ''; // Limpiar al cancelar
      this.cerrar.emit();
    }
  }
}