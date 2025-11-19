import { LuMessagesSquare as Conversa } from "react-icons/lu";
import { MdOutlineEmail as Email } from "react-icons/md";
import { LiaPhoneVolumeSolid as Telefone} from "react-icons/lia";

export default function Contato(){
    const canaisDeContato = [
        {
            icone: Conversa,
            titulo: "Chat ao Vivo",
            acao: "Converse Agora",
            horario1: "Segunda - Sexta",
            horario2: "24 horas - 5 dias por semana",
            corHover: "hover:text-purple-600",
        },
        {
            icone: Email,
            titulo: "Suporte por Email",
            acao: "Envie um Email",
            horario1: "Segunda - Sexta",
            horario2: "24 horas - 5 dias por semana",
            corHover: "hover:text-blue-600",
        },
        {
            icone: Telefone,
            titulo: "Telefone",
            acao: "11 - 9923-0238",
            horario1: "Segunda - Sexta",
            horario2: "das 07:00 às 20:00",
            corHover: "hover:text-pink-600",
        },
    ];

    return(
        <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
            
            <header className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    Entre em <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contato</span>
                </h1>
                <p className="text-xl text-gray-600">
                    Estamos aqui para ajudar. Escolha a melhor forma de falar conosco.
                </p>
            </header>

            {/* Grid de Cartões de Contato */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {canaisDeContato.map((canal, index) => {
                    const IconeComponent = canal.icone;
                    
                    let borderColor = "border-purple-500";
                    if (index === 1) borderColor = "border-blue-500";
                    if (index === 2) borderColor = "border-pink-500";

                    return (
                        // Card do Canal de Contato
                        <div 
                            key={canal.titulo}
                            className={`bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 border-t-4 ${borderColor} flex flex-col items-center p-8 text-center`}
                        >
                            <IconeComponent className={`w-12 h-12 mb-4 text-purple-600 ${canal.corHover} transition-colors`} />

                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {canal.titulo}
                            </h2>
                            
                            {/* Botão de Ação */}
                            <a 
                                href={canal.titulo === "Telefone" ? `tel:${canal.acao.replace(/[^0-9]/g, "")}` : "#"} // Adiciona href para links reais
                                className={`w-full max-w-xs px-6 py-3 mt-2 mb-4 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-md`}
                            >
                                {canal.acao}
                            </a>
                            
                            {/* Informações de Horário */}
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                {canal.horario1}
                            </p>
                            <p className="text-md font-bold text-purple-700">
                                {canal.horario2}
                            </p>

                        </div>
                    );
                })}
            </div>
        </div>
    )
}