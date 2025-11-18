import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/TipoUsuario";
import type { TipoUsuarioHardSkill, TipoUsuarioSoftSkill } from "../../types/TipoSkill";
import { FaUser, FaSignOutAlt as Logout, FaEdit, FaUserGraduate, FaUsers, FaFileAlt } from "react-icons/fa";

export default function Perfil(){
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [hardSkills, setHardSkills] = useState<TipoUsuarioHardSkill[]>([]);
    const [softSkills, setSoftSkills] = useState<TipoUsuarioSoftSkill[]>([]);
    const [mostrarModalSair, setMostrarModalSair] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDadosPerfil = async () => {
            // Buscar usuário do localStorage ou sessionStorage
            const usuarioStorage = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
            
            if (!usuarioStorage) {
                navigate('/');
                return;
            }

            const dadosUsuario = JSON.parse(usuarioStorage);
            setUsuario(dadosUsuario);

            // Função para tentar fetch com retry (cold start no Render)
            const fetchComRetry = async (url: string, tentativas = 2): Promise<Response> => {
                for (let i = 0; i < tentativas; i++) {
                    try {
                        const res = await fetch(url);
                        if (res.ok) return res;
                        
                        // Se erro 404, aguardar antes de tentar novamente (cold start)
                        if (res.status === 404 && i < tentativas - 1) {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            continue;
                        }
                        return res;
                    } catch (erro) {
                        if (i < tentativas - 1) {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            continue;
                        }
                        throw erro;
                    }
                }
                throw new Error('Falha após tentativas');
            };

            try {
                // Buscar hard skills do usuário - buscar todos e filtrar
                const resHardSkills = await fetchComRetry(`https://skillup-kb0z.onrender.com/usuario-hardskill`);
                if (resHardSkills.ok) {
                    const todosHardSkills = await resHardSkills.json();
                    const dadosHardSkills = todosHardSkills.filter((h: any) => 
                        Number(h.idUsuario) === Number(dadosUsuario.idUsuario)
                    );
                    setHardSkills(dadosHardSkills);
                }

                // Buscar soft skills do usuário - endpoint específico existe
                const resSoftSkills = await fetchComRetry(`https://skillup-kb0z.onrender.com/usuario-softskills/usuario/${dadosUsuario.idUsuario}`);
                if (resSoftSkills.ok) {
                    const dadosSoftSkills = await resSoftSkills.json();
                    setSoftSkills(dadosSoftSkills);
                }
            } catch (error) {
                // Erro silencioso - dados não essenciais
            } finally {
                setCarregando(false);
            }
        };

        carregarDadosPerfil();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        sessionStorage.removeItem('usuario');
        setMostrarModalSair(false);
        navigate('/');
    };

    if (!usuario || carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Carregando perfil...</p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Coluna Esquerda - Card de Perfil */}
                    <div className="space-y-6">
                        {/* Card de Informações Básicas */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
                            {/* Header com gradiente */}
                            <div className="bg-linear-to-r from-gray-400 to-gray-500 px-6 py-8 relative">
                                <button
                                    onClick={() => navigate('/editarPerfil')}
                                    className="absolute top-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                >
                                    <FaEdit className="text-white text-lg" />
                                </button>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shrink-0">
                                        <FaUser className="text-4xl sm:text-5xl text-gray-400" />
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-2xl sm:text-3xl font-bold mb-1">{usuario.nome}</h1>
                                        <p className="text-sm sm:text-base text-gray-200">{usuario.areaInteresse}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita - Skills e Ações */}
                    <div className="space-y-6">
                        
                        {/* Tabela de Skills */}
                        <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Tabela de Skills</h2>
                            
                            {/* Grid de Skills 3x3 */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {/* Hard Skills */}
                                {hardSkills.slice(0, 2).map((skill) => (
                                    <div
                                        key={skill.idHardSkill}
                                        className="bg-gray-300 rounded-xl aspect-square flex flex-col items-center justify-center p-3 hover:bg-gray-400 transition-colors cursor-pointer"
                                    >
                                        <FaUserGraduate className="text-3xl text-gray-700 mb-2" />
                                        <p className="text-xs font-semibold text-center text-gray-800 line-clamp-2">
                                            {skill.nomeHardSkill.split(' ')[0]}
                                        </p>
                                    </div>
                                ))}
                                
                                {/* Soft Skills */}
                                {softSkills.slice(0, 1).map((skill) => (
                                    <div
                                        key={skill.idSoftSkill}
                                        className="bg-gray-300 rounded-xl aspect-square flex flex-col items-center justify-center p-3 hover:bg-gray-400 transition-colors cursor-pointer"
                                    >
                                        <FaUsers className="text-3xl text-gray-700 mb-2" />
                                        <p className="text-xs font-semibold text-center text-gray-800 line-clamp-2">
                                            {skill.nomeSoftSkill.split(' ')[0]}
                                        </p>
                                    </div>
                                ))}
                                
                                {/* Células vazias (placeholders) */}
                                {[...Array(Math.max(0, 6 - hardSkills.length - softSkills.length))].map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="bg-gray-300 rounded-xl aspect-square"
                                    ></div>
                                ))}
                            </div>

                            {/* Legenda */}
                            {(hardSkills.length > 0 || softSkills.length > 0) && (
                                <div className="flex gap-4 justify-center text-xs sm:text-sm">
                                    {hardSkills.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <FaUserGraduate className="text-gray-700" />
                                            <span className="text-gray-700">Hard Skills</span>
                                        </div>
                                    )}
                                    {softSkills.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-gray-700" />
                                            <span className="text-gray-700">Soft Skills</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Botão Gerenciar Skills */}
                        <button 
                            onClick={() => navigate('/gerenciar-skills')}
                            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            <FaEdit className="text-xl" />
                            Gerenciar Skills
                        </button>

                        {/* Botão Gerar Relatório */}
                        <button className="w-full bg-black text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                            <FaFileAlt className="text-xl" />
                            Gerar Relatório de Skills
                        </button>

                        {/* Botão Sair */}
                        <button
                            onClick={() => setMostrarModalSair(true)}
                            className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Modal de Confirmação */}
                {mostrarModalSair && (
                    <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 z-50">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-8 transform transition-all border-2 border-gray-200">
                            <div className="text-center mb-5 sm:mb-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                                    <Logout className="text-2xl sm:text-3xl text-red-600" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Confirmar Saída</h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Tem certeza que deseja sair da sua conta?
                                </p>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <button
                                    onClick={() => setMostrarModalSair(false)}
                                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}