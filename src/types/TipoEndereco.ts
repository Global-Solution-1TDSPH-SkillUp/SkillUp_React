export type TipoEndereco = {
    idEndereco: number;
    dsLogradouro: string;
    numero: number;
    dsEstado: string;
    dsCidade: string;
    nrCep: string;
    idUsuario: number;
}

export type CadastroEndereco = Omit<TipoEndereco, 'idEndereco'>;