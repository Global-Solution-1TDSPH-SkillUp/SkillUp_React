import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h1>
                    <p className="text-gray-600">Acesse sua conta do SkillUp</p>
                </div>

                <form action="">
                    <div className="labelLogin">
                        <label htmlFor="form-label"> Nome: </label>
                        <input type="text" />
                    </div>
                
                    <div className="labelLogin">
                        <label htmlFor="form-label"> Senha: </label>
                        <input type="password" />
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