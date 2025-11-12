import { Link } from "react-router-dom";

export default function FAQ(){
    return(
        <main>
            <h1>Perguntas Frequentes</h1>
            <div>
                <h3>Como o sistema funciona?</h3>
                <p>Com base nas informações forncidas pelo usuário o sistema analisa suas formações e skills para te recomendar cursos para Upskilling e caso queira se aprofundar em um assunto que já sabe tambem temos o sistema de Reskilling</p>
            </div>

            <div>
                <h3>O sistema funciona 24 horas?</h3>
                <p>Sim, o sistema funciona 24 horas.</p>
            </div>

            <div>
                <h3>O sistema irá apresentar minhas Skills?</h3>
                <p>Sim, o sistema permite você apresentar suas HardSkills e SoftSkills</p>
            </div>

            <div>
                <h3>Posso exportar meu Perfil?</h3>
                <p>Sim, o sistema permite você exportar seu perfim com seus cursos e skills.</p>
            </div>

            <div>
                <h3>Como posso entrar em Contato?</h3>
                <p>Você pode entrar em contato conosco na página <Link to="/contato ">Contato.</Link></p>
            </div>
        </main>
    )
}