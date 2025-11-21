import type { TipoEndereco } from "../../types/TipoEndereco";
import { formatarEnderecoMultilinhas } from "../../routes/Endereco/Endereco";
import { FaMapMarkerAlt as MapMarker } from "react-icons/fa";

interface ExibirEnderecoProps {
    endereco: TipoEndereco | null;
}

export default function ExibirEndereco({ endereco }: ExibirEnderecoProps) {
    if (!endereco) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 text-center">
                <p className="text-gray-500">Nenhum endereço cadastrado</p>
            </div>
        );
    }

    const linhas = formatarEnderecoMultilinhas(endereco);

    return (
        <div className="bg-white p-4 sm:p-5 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors">
            <div className="flex items-start gap-3">
                <MapMarker className="text-green-600 text-xl sm:text-2xl mt-1 shrink-0" />
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Endereço</h3>
                    <div className="space-y-1 text-sm sm:text-base text-gray-700">
                        <p className="font-medium">{linhas[0]}</p>
                        <p>{linhas[1]}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{linhas[2]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
