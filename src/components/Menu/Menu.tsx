import { Link } from "react-router-dom"

export default function Menu() {
    return(
        <nav className="hidden md:flex space-x-8">
            <Link 
                to="/" 
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
                Início
            </Link>
            <Link 
                to="/quemsomos" 
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
                Quem Somos
            </Link>
            <Link 
                to="/contato" 
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
                Contato
            </Link>
            <Link 
                to="/faq" 
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
                FAQ
            </Link>
        </nav>
    )
}