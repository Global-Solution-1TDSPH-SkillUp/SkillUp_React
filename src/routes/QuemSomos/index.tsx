import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function QuemSomos(){
    return(
        <main>
            <h1>Conheça nossa Equipe</h1>
            <div>
                <h2>Gabriel Neris Losano</h2>
                <p>imagem aluno- placeholder</p>
                <p> RM 564093 - 1TDSPH</p>
                <a href="https://github.com/GNLosano" target="blank" rel="noopener">
                <FaGithub/>
                </a>
                <a href="">
                <FaLinkedin/>
                </a>
            </div>
            <div>
                <h2>João Vitor Biribilli Ravelli</h2>
                <p>imagem aluno- placeholder</p>
                <p> RM 565594- 1TDSPH</p>
                <a href="https://github.com/biribillidev" target="blank" rel="noopener">
                <FaGithub/>
                </a>
                <a href="https://www.linkedin.com/in/joão-vitor-biribilli-ravelli-b9b447367/" target="blank" rel="noopener">
                <FaLinkedin/>
                </a>
            </div>
            <div>
                <h2>Pietro Paranhos Wilhelmi</h2>
                <p>imagem aluno- placeholder</p>
                <p> RM 561378- 1TDSPH</p>
                <a href="https://github.com/PietroWilhelm" target="blank" rel="noopener">
                <FaGithub/>
                </a>
                <a href="" target="blank" rel="noopener">
                <FaLinkedin/>
                </a>
            </div>
        </main>   
    )
}