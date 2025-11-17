export type TipoUsuario = {
    idUsuario: number;
    nome: string;
    email: string;
    areaInteresse: string;
    senha: string;
    dtCadastro: string;
}

export type CadastroUsuario = Omit<TipoUsuario, 'idUsuario' | 'dtCadastro'>;