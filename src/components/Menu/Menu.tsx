import { Link } from "react-router-dom"
import { useState } from "react"

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
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

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-20 left-0 right-0 bg-purple-700 md:hidden shadow-lg z-40">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link 
                            to="/" 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-200 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                        >
                            Início
                        </Link>
                        <Link 
                            to="/quemsomos" 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-200 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                        >
                            Quem Somos
                        </Link>
                        <Link 
                            to="/contato" 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-200 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                        >
                            Contato
                        </Link>
                        <Link 
                            to="/faq" 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-200 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                        >
                            FAQ
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}