export interface UsuarioDTO {
    id_usuario?: number; // Opcional si es nuevo, pero debe existir en el tipo
    nombre_usuario: string;
    apellido_usuario: string;
    documento_usuario: string;
    telefono_usuario: string;
    correo_usuario: string;
    id_rol: number;
    id_carrera: number;
    id_semillero: number | null;
    contrasena_usuario?: string;
    // ... cualquier otra propiedad que uses (nombre_rol, nombre_carrera, etc.)
}