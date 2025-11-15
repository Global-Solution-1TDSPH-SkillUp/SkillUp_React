import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

function onSubmit() {
    alert('Cadastro realizado com sucesso!')
}

export default function Cadastro(){
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [mostrarSenha, setMostrarSenha] = useState(false)

    return(
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastre-se</h1>
                    <p className="text-gray-600">Preencha os campos abaixo para criar sua conta</p>
                </div>
        
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome
                        </label>
                        <input 
                            type="text"
                            id="nome"
                            {...register("nome",{
                                required: "Nome é obrigatório",
                                minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." }
                            })}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            placeholder="Seu nome completo"
                        />
                        {errors.nome && <p className="mt-1 text-sm text-red-600">{String(errors.nome.message)}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input 
                            type="email"
                            id="email"
                            {...register("email",{
                                required: "Email é obrigatório",
                                pattern:{
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Insira um email válido" 
                                }
                            })}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            placeholder="seu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>}
                    </div>

                    {/* Senha */}
                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <div className="relative">
                            <input 
                                type={mostrarSenha ? "text" : "password"}
                                id="senha"
                                {...register("senha", {
                                    required: "Senha é obrigatória",
                                    minLength: {value: 8, message: "A senha deve ter pelo menos 8 caracteres"},
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
                                    }
                                })}
                                className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {mostrarSenha ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.senha && <p className="mt-1 text-sm text-red-600">{String(errors.senha.message)}</p>}
                    </div>

                    {/* Área de Interesse */}
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                            Área de Interesse
                        </label>
                        <input 
                            type="text"
                            id="area"
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            placeholder="Ex: Tecnologia, Marketing, Design..."
                        />
                    </div>

                    {/* Botão Submit */}
                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                    >
                        Cadastrar
                    </button>
                </form>

                {/* Link Login */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Já tem conta?{" "}
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Faça login aqui!
                    </Link>
                </p>
            </div>
        </div>
    )
}