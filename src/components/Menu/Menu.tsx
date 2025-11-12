import { Link } from "react-router-dom"

export default function Menu() {
    return(
        <nav className="menu">
            <Link to="/">Inicio</Link>
            <Link to="/quemsomos">Quem Somos</Link>
            <Link to="/contato">Contato</Link>
        </nav>
    )
}