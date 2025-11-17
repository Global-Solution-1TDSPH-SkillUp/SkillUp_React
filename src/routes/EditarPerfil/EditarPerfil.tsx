import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TipoUsuario } from "../../types/TipoUsuario";
import { FaUser as User, FaEnvelope as Envelope, FaLightbulb as Lightbulb , FaSave as Save, FaTimes as Times, FaLock as Lock, FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";

type FormEditarPerfil = {
    nome: string;
    email: string;
    areaInteresse: string;
    senhaAtual: string;
    novaSenha?: string;
    confirmarSenha?: string;
};

export default function EditarPerfil(){
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormEditarPerfil>();

    useEffect(() => {
        const usuarioStorage = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
        
        if (!usuarioStorage) {
            navigate('/');
            return;
        }

        const dadosUsuario = JSON.parse(usuarioStorage);
        setUsuario(dadosUsuario);
    }, [navigate]);

    const onSubmit = async (data: FormEditarPerfil) => {
        if (!usuario) return;

        // Validar senha atual
        if (data.senhaAtual !== usuario.senha) {
            setError('senhaAtual', {
                type: 'manual',
                message: 'Senha atual incorreta'
            });
            return;
        }

        // Se está alterando a senha, validar nova senha
        if (alterarSenha) {
            if (!data.novaSenha || !data.confirmarSenha) {
                setError('novaSenha', {
                    type: 'manual',
                    message: 'Preencha a nova senha e a confirmação'
                });
                return;
            }

            if (data.novaSenha !== data.confirmarSenha) {
                setError('confirmarSenha', {
                    type: 'manual',
                    message: 'As senhas não coincidem'
                });
                return;
            }
        }

        try {
            // Preparar dados para atualização
            const dadosAtualizados: TipoUsuario = {
                ...usuario,
                nome: data.nome,
                email: data.email,
                areaInteresse: data.areaInteresse,
                senha: alterarSenha && data.novaSenha ? data.novaSenha : usuario.senha
            };

            // Fazer PUT na API
            const response = await fetch(`https://skillup-kb0z.onrender.com/usuarios/${usuario.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar perfil');
            }

            // Atualizar localStorage/sessionStorage
            const storageKey = localStorage.getItem('usuario') ? 'localStorage' : 'sessionStorage';
            if (storageKey === 'localStorage') {
                localStorage.setItem('usuario', JSON.stringify(dadosAtualizados));
            } else {
                sessionStorage.setItem('usuario', JSON.stringify(dadosAtualizados));
            }

            setUsuario(dadosAtualizados);
            setMensagemSucesso(true);

            // Redirecionar para perfil após 2 segundos
            setTimeout(() => {
                navigate('/perfil');
            }, 2000);

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            setError('senhaAtual', {
                type: 'manual',
                message: 'Erro ao atualizar perfil. Tente novamente.'
            });
        }
    };

    if (!usuario) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Carregando...</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
                {/* Card Principal */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-4 sm:px-8 py-8 sm:py-12 text-center">
                        <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                            <User className="text-4xl sm:text-6xl text-purple-600" />
                        </div>
                        <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">Editar Perfil</h1>
                        <p className="text-sm sm:text-base text-blue-100">Atualize suas informações pessoais</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                        
                        {/* Mensagem de Sucesso */}
                        {mensagemSucesso && (
                            <div className="bg-green-100 border-2 border-green-500 text-green-800 px-4 py-3 rounded-lg text-center">
                                <p className="font-semibold">✓ Perfil atualizado com sucesso!</p>
                                <p className="text-sm">Redirecionando...</p>
                            </div>
                        )}

                        {/* Nome */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                <User className="text-blue-600" />
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                defaultValue={usuario.nome}
                                {...register('nome', {
                                    required: 'Nome é obrigatório',
                                    minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
                                })}
                                className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                placeholder="Digite seu nome completo"
                            />
                            {errors.nome && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.nome.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                <Envelope className="text-purple-600" />
                                E-mail
                            </label>
                            <input
                                type="email"
                                defaultValue={usuario.email}
                                {...register('email', {
                                    required: 'Email é obrigatório',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email inválido'
                                    }
                                })}
                                className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm sm:text-base"
                                placeholder="seu@email.com"
                            />
                            {errors.email && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Área de Interesse */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                <Lightbulb className="text-green-600" />
                                Área de Interesse
                            </label>
                            <input
                                type="text"
                                defaultValue={usuario.areaInteresse}
                                {...register('areaInteresse', {
                                    required: 'Área de interesse é obrigatória'
                                })}
                                className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-sm sm:text-base"
                                placeholder="Ex: Programação, Design, Marketing..."
                            />
                            {errors.areaInteresse && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.areaInteresse.message}</p>}
                        </div>

                        {/* Senha Atual (Obrigatória) */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                <Lock className="text-red-600" />
                                Senha Atual *
                            </label>
                            <div className="relative">
                                <input
                                    type={mostrarSenhaAtual ? "text" : "password"}
                                    {...register('senhaAtual', {
                                        required: 'Digite sua senha atual para confirmar as alterações'
                                    })}
                                    className="w-full px-4 py-2.5 sm:py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-sm sm:text-base"
                                    placeholder="Digite sua senha atual"
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {mostrarSenhaAtual ? <EyeSlash/> : <Eye/>}
                                </button>
                            </div>
                            {errors.senhaAtual && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.senhaAtual.message}</p>}
                        </div>

                        {/* Checkbox para alterar senha */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="alterarSenha"
                                checked={alterarSenha}
                                onChange={(e) => setAlterarSenha(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="alterarSenha" className="text-gray-700 text-sm sm:text-base cursor-pointer">
                                Desejo alterar minha senha
                            </label>
                        </div>

                        {/* Campos de Nova Senha (Condicional) */}
                        {alterarSenha && (
                            <div className="space-y-4 sm:space-y-5 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                                {/* Nova Senha */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                        <Lock className="text-orange-600" />
                                        Nova Senha
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={mostrarNovaSenha ? "text" : "password"}
                                            {...register('novaSenha', {
                                                minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                                    message: 'A senha deve conter letras maiúsculas, minúsculas e números'
                                                }
                                            })}
                                            className="w-full px-4 py-2.5 sm:py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            placeholder="Digite a nova senha"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {mostrarNovaSenha ? <EyeSlash /> : <Eye/>}
                                        </button>
                                    </div>
                                    {errors.novaSenha && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.novaSenha.message}</p>}
                                </div>

                                {/* Confirmar Nova Senha */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                                        <Lock className="text-orange-600" />
                                        Confirmar Nova Senha
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={mostrarConfirmarSenha ? "text" : "password"}
                                            {...register('confirmarSenha')}
                                            className="w-full px-4 py-2.5 sm:py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            placeholder="Confirme a nova senha"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {mostrarConfirmarSenha ? <EyeSlash /> : <Eye/>}
                                        </button>
                                    </div>
                                    {errors.confirmarSenha && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.confirmarSenha.message}</p>}
                                </div>
                            </div>
                        )}

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/perfil')}
                                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 transition-all"
                            >
                                <Times className="text-lg sm:text-xl" />
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Save className="text-lg sm:text-xl" />
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}