import { Carrera } from './carrera.model';

// Coincide con com.jdc.repojuandata.models.SemilleroEntity (backend)
export interface Semillero {
    id: number;
    nombre: string;
    carrera?: Carrera;
}

// Respuesta ad-hoc de GET /documentos/usuario/mi-semillero (Map armado a mano en el backend)
export interface MiSemillero {
    idSemillero: number;
    nombreSemillero: string;
}
