import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div className="formCadastro">
        
        <h1>Login</h1>
        <p>Preencha os campos abaixo para realizar o Login</p>

        <form action="">
        <div className="labelLogin">
                <label htmlFor="form-label"> Nome: </label>
                <input type="text" 
                />
            </div>
        
        <div className="labelLogin">
                <label htmlFor="form-label"> Senha: </label>
                <input type="password" 
                />
            </div>

            <button
            type="submit"
            className="submit-button">
                Login
          </button>
          <p className="login-link"> Não tem uma conta? <Link to="/cadastro"> Faça o Cadastro aqui! </Link>
        </p>
        </form>
        </div>
    )
}