import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye as Eye, FaEyeSlash as EyeSlash, FaLock as Lock } from "react-icons/fa";
import type { TipoUsuario } from "../../types/TipoUsuario";

export default function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [lembrarMe, setLembrarMe] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            // Buscar todos os usuários
            const response = await fetch('https://skillup-kb0z.onrender.com/usuarios');
            
            if (!response.ok) {
                throw new Error('Erro ao conectar com o servidor');
            }

            const usuarios: TipoUsuario[] = await response.json();

            // Verificar se existe um usuário com email e senha correspondentes
            const usuarioEncontrado = usuarios.find(
                (user) => user.email === email && user.senha === senha
            );

            if (usuarioEncontrado) {
                // Login bem-sucedido
                if (lembrarMe) {
                    localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
                } else {
                    sessionStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
                }
                
                alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
                navigate('/home');
            } else {
                setErro('Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setErro('Erro ao realizar login. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    return(
        <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Painel Esquerdo - Bem-vindo */}
                <div className="hidden lg:flex lg:w-1/2rounded-2xl p-12 flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Bem-vindo de volta ao <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SkillUp</span>
                    </h2>
                    <p className="text-gray-600 mb-12">
                        Continue sua jornada de aprendizado e desenvolvimento profissional.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-blue-600 text-pur" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-lg mb-1">Acesso seguro</h3>
                                <p className="text-gray-600 text-sm">Seus dados protegidos com criptografia</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-lg mb-1">Aprendizado rápido</h3>
                                <p className="text-gray-600 text-sm">Plataforma otimizada para você</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Painel Direito - Formulário */}
                <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h1>
                    <p className="text-gray-600">Acesse sua conta do SkillUp</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Mensagem de Erro */}
                    {erro && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {erro}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>
                
                    {/* Senha */}
                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {mostrarSenha ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Opções */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={lembrarMe}
                                onChange={(e) => setLembrarMe(e.target.checked)}
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Lembrar-me</span>
                        </label>
                        <button 
                            type="button"
                            onClick={() => alert('Funcionalidade será implementada em breve!')}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                            Esqueceu a senha?
                        </button>
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* Link Cadastro */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Cadastre-se aqui
                    </Link>
                </p>
                </div>
            </div>
        </div>
    )
}