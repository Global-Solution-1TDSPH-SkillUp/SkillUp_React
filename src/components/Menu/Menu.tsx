import { Link } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../../contexts/ThemeContext"

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const linkStyle = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 ${
    theme === "dark" ? "text-white hover:text-purple-300" : "text-white hover:text-purple-200"
  }`

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6 lg:space-x-8">
        <Link to="/home" className={linkStyle}>Início</Link>
        <Link to="/quemsomos" className={linkStyle}>Quem Somos</Link>
        <Link to="/contato" className={linkStyle}>Contato</Link>
        <Link to="/faq" className={linkStyle}>FAQ</Link>
        <Link to="/perfil" className={linkStyle}>Perfil</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden p-2 rounded-md transition-colors ${
          theme === "dark" ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
        }`}
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
        <div
          className={`absolute top-20 left-0 right-0 shadow-lg z-40 ${
            theme === "dark" ? "bg-gray-800" : "bg-purple-700"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-2">
            {["home", "quemsomos", "contato", "faq", "perfil"].map((path) => (
              <Link
                key={path}
                to={`/${path}`}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 ${
                  theme === "dark" ? "text-white hover:text-purple-300" : "text-white hover:text-purple-200"
                }`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
