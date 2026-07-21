// Coincide con com.jdc.repojuandata.models.DocumentosEntity / DTO.DocumentosDTO (backend, ambos serializan camelCase)
export interface Documento {
    idDocumento: number;
    tituloDocumento: string;
    temaDocumento: string;
    archivoDocumento: string;
    rutaArchivo?: string;
    fechaDocumento: string;
    estado: number;
    categoria?: string;
    idMateria?: number;
    idUsuario?: number;
}

// Coincide con com.jdc.repojuandata.DTO.DocumentoPendienteDTO (backend)
export interface DocumentoPendiente {
    idDocumento: number;
    nombreEstudiante: string;
    apellidoEstudiante: string;
    fechaDocumento: string;
    temaDocumento: string;
    tituloDocumento: string;
    archivoDocumento: string;
    correoEstudiante: string;
    numeroSemestre: number;
}

// Coincide con com.jdc.repojuandata.DTO.DocumentoMasVistoDTO (backend)
export interface DocumentoMasVisto {
    nombreEstudiante: string;
    archivoDocumento: string;
    semestre: number;
    fechaUltimaVista: string;
    cantidadVistas: number;
}

// Coincide con com.jdc.repojuandata.DTO.DocumentoSemilleroDTO (backend)
export interface DocumentoSemillero {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    idSemillero: number;
    nombreSemillero: string;
    idCarrera: number;
    nombreCarrera: string;
    idDocumento: number;
    tituloDocumento: string;
    temaDocumento: string;
    archivoDocumento: string;
    fechaDocumento: string;
}
