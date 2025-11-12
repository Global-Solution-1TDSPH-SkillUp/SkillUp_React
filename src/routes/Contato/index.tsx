import { LuMessagesSquare as Conversa } from "react-icons/lu";
import { MdOutlineEmail as Email } from "react-icons/md";
import { LiaPhoneVolumeSolid as Telefone} from "react-icons/lia";

export default function Contato(){
    return(
        <main>
            <h1>Contato</h1>
            <h2>Entre em contato conosco</h2>

            <div>
                <Conversa/>
                <button>Converse Agora</button>
                <p>Segunda - Sexta</p>
                <p>24 horas - 5 dias por semana</p>
            </div>

            <div>
                <Email/>
                <button>Envie um Email</button>
                <p>Segunda - Sexta</p>
                <p>24 horas - 5 dias por semana</p>
            </div>

            <div>
                <Telefone/>
                <button>11 - 9923-0238</button>
                <p>Segunda - Sexta</p>
                <p>das 07:00 às 20:00</p>
            </div>

        </main>
    )
}