import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return(
        <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h1>
                    <p className="text-gray-600">Acesse sua conta do SkillUp</p>
                </div>

                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                
                    {/* Senha */}
                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Login
                    </button>
                    
                    <p className="login-link"> 
                        Não tem uma conta? <Link to="/cadastro"> Faça o Cadastro aqui! </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}