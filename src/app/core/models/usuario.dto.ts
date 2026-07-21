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

// Coincide con com.jdc.repojuandata.DTO.UsuarioSimpleDTO (backend)
export interface UsuarioSimpleDTO {
    id_usuario: number;
    nombre_usuario: string;
    apellido_usuario: string;
    correo_usuario: string;
    contrasena_usuario?: string;
    telefono_usuario: string;
    documento_usuario: string;
    id_rol: number;
    nombre_rol: string;
    id_carrera: number;
    nombre_carrera: string;
    estado: number;
    id_semillero: number | null;
}