import Menu from "../Menu/Menu"
import { useLocation } from "react-router-dom"


export default function Cabecalho() {
    const location = useLocation() // Acesso a localização atual da rota
    const rotasSemMenu = ['/', '/cadastro', '/editarPerfil', '/gerenciar-skills', '/gerenciar-cursos'] //crio uma lista de  Rotas onde o menu não deve ser exibido
    const mostrarMenu = !rotasSemMenu.includes(location.pathname) // Verifico se a rota atual está na lista de rotas sem menu

    return(
        <header className="bg-linear-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="relative flex items-center justify-between h-20 px-4 sm:px-6 lg:px-12">
                {/* Logo */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:scale-105 transition-transform cursor-pointer">
                        SkillUp
                    </h1>
                </div>
                
                {/* Menu */}
                {mostrarMenu && <Menu/>}
            </div>
        </header>
    );
}