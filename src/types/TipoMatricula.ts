export type TipoMatricula = {
    idMatricula: number;
    numeroProgresso: string;
    dataInicio: string;
    idUsuario: number;
    idCurso: number;
    // Campos adicionais quando vier do backend com JOIN
    nomeCurso?: string;
    areaCurso?: string;
    nivelCurso?: string;
    cargaHorariaCurso?: number;
}