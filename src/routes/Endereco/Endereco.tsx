import { useState } from "react";
import type { TipoEndereco, CadastroEndereco } from "../../types/TipoEndereco";
import { ESTADOS_BRASILEIROS } from "../../utils/EstadosBrasileiros";


// ============================================================================
// FUNÇÕES DE API
// ============================================================================

export const buscarEnderecoPorUsuario = async (
  idUsuario: number
): Promise<TipoEndereco | null> => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `https://skillup-kb0z.onrender.com/enderecos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar endereço: ${response.statusText}`);
    }

    const enderecos: TipoEndereco[] = await response.json();
    const enderecoUsuario = enderecos.find((e) => e.idUsuario === idUsuario);

    return enderecoUsuario || null;
  } catch (error) {
    return null;
  }
};

export const buscarEnderecoPorId = async (
  idEndereco: number
): Promise<TipoEndereco> => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `https://skillup-kb0z.onrender.com/enderecos/${idEndereco}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar endereço");
  }

  const endereco = await response.json();
  return endereco;
};

export const criarEndereco = async (
  endereco: CadastroEndereco
): Promise<TipoEndereco> => {
  const token = sessionStorage.getItem("token");

  const payload = {
    idEndereco: 0,
    ...endereco,
  };

  const response = await fetch(
    `https://skillup-kb0z.onrender.com/enderecos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao criar endereço: ${response.statusText}`);
  }

  const novoEndereco = await response.json();
  return novoEndereco;
};

export const atualizarEndereco = async (
  endereco: TipoEndereco
): Promise<TipoEndereco> => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `https://skillup-kb0z.onrender.com/enderecos/${endereco.idEndereco}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(endereco),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar endereço");
  }

  const enderecoAtualizado = await response.json();
  return enderecoAtualizado;
};

export const deletarEndereco = async (idEndereco: number): Promise<void> => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `https://skillup-kb0z.onrender.com/enderecos/${idEndereco}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar endereço");
  }
};

export const salvarEndereco = async (
  endereco: Partial<TipoEndereco>
): Promise<TipoEndereco> => {
  if (endereco.idEndereco && endereco.idEndereco > 0) {
    return atualizarEndereco(endereco as TipoEndereco);
  } else {
    const { idEndereco, ...cadastroEndereco } = endereco;
    return criarEndereco(cadastroEndereco as CadastroEndereco);
  }
};

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================================================

export const formatarEndereco = (endereco: TipoEndereco): string => {
  return `${endereco.dsLogradouro}, ${endereco.numero} - ${endereco.dsCidade}/${endereco.dsEstado} - CEP: ${endereco.nrCep}`;
};

export const formatarEnderecoMultilinhas = (endereco: TipoEndereco): string[] => {
  return [
    `${endereco.dsLogradouro}, ${endereco.numero}`,
    `${endereco.dsCidade} - ${endereco.dsEstado}`,
    `CEP: ${endereco.nrCep}`,
  ];
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

interface UseEnderecoReturn {
  endereco: Partial<TipoEndereco>;
  salvandoEndereco: boolean;
  setSalvandoEndereco: (salvando: boolean) => void;
  salvarEnderecoUsuario: (
    enderecoData: Partial<TipoEndereco>,
    idUsuario: number
  ) => Promise<void>;
  carregarEndereco: (idUsuario: number) => Promise<void>;
  atualizarCampoEndereco: (campo: keyof TipoEndereco, valor: string | number) => void;
}

export const useEndereco = (): UseEnderecoReturn => {
  const [endereco, setEndereco] = useState<Partial<TipoEndereco>>({});
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);

  const carregarEndereco = async (idUsuario: number) => {
    try {
      const enderecoExistente = await buscarEnderecoPorUsuario(idUsuario);
      if (enderecoExistente) {
        setEndereco(enderecoExistente);
      }
    } catch (error) {
      // Silenciosamente ignora erros de carregamento
    }
  };

  const salvarEnderecoUsuario = async (
    enderecoData: Partial<TipoEndereco>,
    idUsuario: number
  ) => {
    setSalvandoEndereco(true);
    try {
      const enderecoParaSalvar = {
        ...enderecoData,
        idUsuario,
      };

      const enderecoSalvo = await salvarEndereco(enderecoParaSalvar);
      setEndereco(enderecoSalvo);
    } catch (error) {
      throw error;
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const atualizarCampoEndereco = (campo: keyof TipoEndereco, valor: string | number) => {
    setEndereco(prev => ({ ...prev, [campo]: valor }));
  };

  return {
    endereco,
    salvandoEndereco,
    setSalvandoEndereco,
    salvarEnderecoUsuario,
    carregarEndereco,
    atualizarCampoEndereco,
  };
};

// ============================================================================
// COMPONENTE DE FORMULÁRIO
// ============================================================================

interface FormularioEnderecoProps {
  possuiEndereco: boolean;
  onPossuiEnderecoChange: (possui: boolean) => void;
  endereco: Partial<TipoEndereco>;
  onEnderecoChange: (campo: keyof TipoEndereco, valor: string | number) => void;
}

export const FormularioEndereco = ({
  possuiEndereco,
  onPossuiEnderecoChange,
  endereco,
  onEnderecoChange,
}: FormularioEnderecoProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="possuiEndereco"
          checked={possuiEndereco}
          onChange={(e) => onPossuiEnderecoChange(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="possuiEndereco" className="text-gray-700 text-sm sm:text-base cursor-pointer">
          Desejo cadastrar meu endereço
        </label>
      </div>

      {possuiEndereco && (
        <div className="space-y-4 pl-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nrCep"
                className="block text-sm font-medium mb-1"
              >
                CEP
              </label>
              <input
                type="text"
                id="nrCep"
                value={endereco.nrCep || ""}
                onChange={(e) => onEnderecoChange("nrCep", e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dsLogradouro"
                className="block text-sm font-medium mb-1"
              >
                Logradouro
              </label>
              <input
                type="text"
                id="dsLogradouro"
                value={endereco.dsLogradouro || ""}
                onChange={(e) =>
                  onEnderecoChange("dsLogradouro", e.target.value)
                }
                placeholder="Rua, Avenida, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="numero" className="block text-sm font-medium mb-1">
              Número
            </label>
            <input
              type="number"
              id="numero"
              value={endereco.numero || ""}
              onChange={(e) =>
                onEnderecoChange("numero", parseInt(e.target.value) || 0)
              }
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dsCidade"
                className="block text-sm font-medium mb-1"
              >
                Cidade
              </label>
              <input
                type="text"
                id="dsCidade"
                value={endereco.dsCidade || ""}
                onChange={(e) => onEnderecoChange("dsCidade", e.target.value)}
                placeholder="São Paulo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dsEstado"
                className="block text-sm font-medium mb-1"
              >
                Estado
              </label>
              <select
                id="dsEstado"
                value={endereco.dsEstado || ""}
                onChange={(e) => onEnderecoChange("dsEstado", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione um estado</option>
                {ESTADOS_BRASILEIROS.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPONENTE DE EXIBIÇÃO
// ============================================================================

interface ExibirEnderecoProps {
  endereco: TipoEndereco | null;
}

export const ExibirEndereco: React.FC<ExibirEnderecoProps> = ({ endereco }) => {
  if (!endereco) {
    return (
      <div className="text-gray-500 text-sm italic">
        Nenhum endereço cadastrado
      </div>
    );
  }

  const linhas = formatarEnderecoMultilinhas(endereco);

  return (
    <div className="flex items-start gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-600 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <div className="text-sm">
        {linhas.map((linha, index) => (
          <div key={index}>{linha}</div>
        ))}
      </div>
    </div>
  );
};
