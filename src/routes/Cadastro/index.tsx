import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function onSubmit() {
    alert('Cadastro realizado com sucesso!')
  }

export default function Cadastro(){

    const {register, handleSubmit} = useForm()

    return(
        <div className="formCadastro">
        
        <h1> Cadastre-se </h1>
        <p>Preencha os campos abaixo para se cadastrar</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="labelCadastro">
                <label htmlFor="form-label"> Nome: </label>
                <input type="text"
                {...register("nome",{
                    required: "Nome é obrigatório",
                    minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." }
                })} 
                />
            </div>

            <div className="labelCadastro">
                <label htmlFor="form-label"> Email:</label>
                <input type="email"
                {...register("email",{
                    required: "Email é obrigatório",
                    pattern:{
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Insira um email válido" 
                    }
                })}
                />
            </div>

            <div className="labelCadastro">
                <label htmlFor="form-label"> Senha:</label>
                <input type="password" 
                {...register("senha", {
                    required: "Senha é obrigatória",
                    minLength: {value: 8, message: "A senha deve ter pelo menis 8 caracteres"},
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
                    }
                })}
                />
            </div>

            <div className="labelCadastro">
                <label htmlFor="text"> Area de Interesse: </label>
                <input type="text" 
                required
                />
            </div>

            <button
            type="submit"
            className="submit-button">
                Cadastrar
          </button>
          <p className="login-link"> Já tem conta? <Link to="/login"> Faça login aqui! </Link></p>
        </form>
        </div>
    )
}