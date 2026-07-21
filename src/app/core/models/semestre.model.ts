// Coincide con com.jdc.repojuandata.models.SemestresEntity (backend).
// snake_case porque así se llama el campo Java (Lombok genera getId_semestre()/getNumero_semestre()).
export interface Semestre {
    id_semestre: number;
    numero_semestre: number;
}
