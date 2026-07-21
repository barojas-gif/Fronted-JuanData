import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-mensaje',
  standalone: true,
  templateUrl: './modal-mensaje.component.html',
  styleUrls: ['./modal-mensaje.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ModalMensajeComponent {
  @Input() mostrar = false;
  @Input() tipo: 'aceptar' | 'rechazar' = 'aceptar';
  @Input() idDocumento!: number;
  @Input() correoEstudiante!: string;

  @Output() cerrar = new EventEmitter<void>();

  // ESTA ES LA LÍNEA QUE FALTA O ESTÁ MAL ESCRITA:
  @Output() enviarConfirmado = new EventEmitter<{ id: number, mensaje: string, tipo: string }>();

  mensaje: string = '';
  enviando: boolean = false;

  enviarMensaje() {
    if (this.mensaje.trim()) {
      this.enviando = true;

      // Emitimos el objeto completo para que el padre lo reciba
      this.enviarConfirmado.emit({
        id: this.idDocumento,
        mensaje: this.mensaje,
        tipo: this.tipo
      });
    }
  }

  cerrarModal() {
    if (!this.enviando) {
      this.cerrar.emit();
    }
  }
}