export type TipoEndereco = {
    idEndereco: number;
    nomeLogradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    cep: string;
    idUsuario: number;
}

export type CadastroEndereco = Omit<TipoEndereco, 'idEndereco'>;