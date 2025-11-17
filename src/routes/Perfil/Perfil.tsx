import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/TipoUsuario";
import { FaUser as User, FaEnvelope as Envelope, FaLightbulb as Lightbulb, FaCalendar as Calendar, FaSignOutAlt as Logout, FaLock as Lock, FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";

export default function Perfil(){
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarModalSair, setMostrarModalSair] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar usuário do localStorage ou sessionStorage
        const usuarioStorage = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
        
        if (!usuarioStorage) {
            // Se não estiver logado, redireciona para login
            navigate('/');
            return;
        }

        setUsuario(JSON.parse(usuarioStorage));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        sessionStorage.removeItem('usuario');
        setMostrarModalSair(false);
        navigate('/');
    };

    if (!usuario) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Carregando...</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Card Principal */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header do Card */}
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-12 text-center">
                        <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="text-6xl text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{usuario.nome}</h1>
                        <p className="text-blue-100">{usuario.email}</p>
                    </div>

                    {/* Informações do Perfil */}
                    <div className="p-8 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações do Perfil</h2>

                        {/* Nome */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <User className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Nome Completo</p>
                                <p className="text-gray-800 font-semibold">{usuario.nome}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <Envelope className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">E-mail</p>
                                <p className="text-gray-800 font-semibold">{usuario.email}</p>
                            </div>
                        </div>

                        {/* Área de Interesse */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <Lightbulb className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Área de Interesse</p>
                                <p className="text-gray-800 font-semibold">{usuario.areaInteresse}</p>
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <Lock className="text-red-600 text-xl" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 font-medium">Senha</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-800 font-semibold">
                                        {mostrarSenha ? usuario.senha : '••••••••'}
                                    </p>
                                    <button
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {mostrarSenha ? <EyeSlash className="text-lg" />: <Eye className="text-lg" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data de Cadastro */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                                <Calendar className="text-yellow-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Membro desde</p>
                                <p className="text-gray-800 font-semibold">
                                    {new Date(usuario.dtCadastro).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        </div>

                        {/* Botão Sair */}
                        <div className="pt-6">
                            <button
                                onClick={() => setMostrarModalSair(true)}
                                className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Logout className="text-xl" />
                                Sair da Conta
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal de Confirmação */}
                {mostrarModalSair && (
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all border-2 border-gray-200">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Logout className="text-3xl text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirmar Saída</h2>
                                <p className="text-gray-600">
                                    Tem certeza que deseja sair da sua conta?
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setMostrarModalSair(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg"
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