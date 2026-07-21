import { Carrera } from './carrera.model';
import { Semestre } from './semestre.model';
import { Documento } from './documento.model';

// Coincide con com.jdc.repojuandata.models.MateriasEntity (backend).
// snake_case porque así se llama el campo Java (Lombok genera getId_materia()/getNombre_materia()).
export interface Materia {
    id_materia: number;
    nombre_materia: string;
    carrerasEntity?: Carrera;
    semestresEntity?: Semestre;
    // Documentos de la materia, adjuntados en el frontend tras cargarlos aparte (no viene del backend)
    documentos?: Documento[];
    filtroBusqueda?: string;
}
