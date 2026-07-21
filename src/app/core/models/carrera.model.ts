// Coincide con com.jdc.repojuandata.models.CarrerasEntity (backend)
export interface Carrera {
    idCarrera: number;
    nombreCarrera: string;
    facultad?: {
        idFacultad: number;
        nombreFacultad: string;
    };
}
