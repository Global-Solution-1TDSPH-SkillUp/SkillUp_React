export type TipoHardSkill = {
    idHardSkill: number;
    nomeHardSkill: string;
    descricaoHardSkill: string;
    categoriaHardSkill: string;
}

export type TipoSoftSkill = {
    idSoftSkill: number;
    nomeSofSkill: string;
    descricaoSofSkill: string;
}

export type TipoUsuarioHardSkill = {
    idUsuario: number;
    idHardSkill: number;
    nivelConhecimento: string; // "Básico" | "Intermediário" | "Avançado"
    nomeUsuario: string;
    nomeHardSkill: string;
}

export type TipoUsuarioSoftSkill = {
    idUsuario: number;
    idSoftSkill: number;
    nivelDominio: string; // "Básico" | "Intermediário" | "Avançado"
    nomeUsuario: string;
    nomeSoftSkill: string;
}
