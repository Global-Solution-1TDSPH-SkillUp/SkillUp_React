export type TipoUsuario = {
    idUsuario: number;
    nome: string;
    email: string;
    areaInteresse: string;
    senha: string;
    dtCriacao: Date;
}

export type CadastroUsuario = Omit<TipoUsuario, 'idUsuario' | 'dtCriacao'>;