// Coincide con com.jdc.repojuandata.Auth.AuthResponse (backend)
export interface AuthResponse {
    token: string;
    idUsuario: number;
    rol: string;
    idCarrera: number;
    nombreUsuario: string;
    temporal: boolean;
}
