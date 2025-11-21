import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

export default function QuemSomos(){
    const { theme } = useTheme();
    const equipe = [
        {
            nome: "Gabriel Neris Losano",
            rm: "RM 564093 - 1TDSPH",
            fotoSrc: "../../public/losano.png",
            githubUrl: "https://github.com/GNLosano",
            linkedinUrl: "https://www.linkedin.com/in/gabriellosano/",
        },
        {
            nome: "João Vitor Biribilli Ravelli",
            rm: "RM 565594- 1TDSPH",
            fotoSrc: "../../public/joao.png",
            githubUrl: "https://github.com/biribillidev",
            linkedinUrl: "https://www.linkedin.com/in/joão-vitor-biribilli-ravelli-b9b447367/",
        },
        {
            nome: "Pietro Paranhos Wilhelm",
            rm: "RM 561378- 1TDSPH",
            fotoSrc: "../../public/pietro.png",
            githubUrl: "https://github.com/PietroWilhelm",
            linkedinUrl: "https://www.linkedin.com/in/pietrowilhelm/",
        },
    ];

    return(
        <div className={`min-h-[calc(100vh-5rem)] py-16 px-4 transition-colors duration-300 ${
        theme === 'dark'
        ? 'bg-gray-100 text-white'
        : 'bg-linear-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}>
            <header className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    Conheça nossa <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Equipe</span>
                </h1>
                <p className="text-xl text-gray-600">
                    Os desenvolvedores por trás do SkillUp, comprometidos com o seu aprendizado.
                </p>
            </header>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {equipe.map((membro) => (
                    <div 
                        key={membro.rm}
                        className={`rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 border-t-4 border-purple-500 flex flex-col items-center p-6 text-center ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-purple-200">
                            <img 
                                src={membro.fotoSrc} 
                                alt={`Foto do integrante ${membro.nome}`} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <h2 className="text-2xl font-semibold mb-1">
                            {membro.nome}
                        </h2>
                        <p className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}> 
                            {membro.rm}
                        </p>
                        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Estudante de Tecnologia e Desenvolvedor Full-Stack.
                        </p>
                        <div className="flex gap-4 mt-auto">
                            <a 
                                href={membro.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`hover:text-purple-600 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-500'}`}
                                aria-label={`Perfil GitHub de ${membro.nome}`}
                            >
                                <FaGithub className="w-8 h-8" />
                            </a>
                            <a 
                                href={membro.linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500'}`}
                                aria-label={`Perfil LinkedIn de ${membro.nome}`}
                            >
                                <FaLinkedin className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}