export default function Cadastro(){
    return(
        <div className="formCadastro">
        <h1> Cadastre-se </h1>
        <p>Preencha os campos abaixo para se cadastrar</p>
        <div className="labelCadastro">
            <label htmlFor="form-label"> Nome: </label>
            <input type="text" 
            required
            />
        </div>
        <div className="labelCadastro">
            <label htmlFor="form-label"> Email:</label>
            <input type="email"
            required
            />
        </div>
        <div className="labelCadastro">
            <label htmlFor="form-label"> Senha:</label>
            <input type="password" 
            required
            />
        </div>
        <div className="labelCadastro">
            <label htmlFor="text"> Area de Interesse: </label>
            <input type="text" 
            required
            />
        </div>
        </div>
    )
}