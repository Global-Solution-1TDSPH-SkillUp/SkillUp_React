import { useLocation } from 'react-router-dom'
import Menu from '../Menu/Menu'
import { useTheme } from '../../contexts/ThemeContext'
import { ThemeToggleButton } from '../ThemeToggle/ThemeToggle'

export default function Cabecalho() {
  const location = useLocation()
  const { theme } = useTheme()

  const rotasSemMenu = ['/', '/cadastro', '/editarPerfil', '/gerenciar-skills', '/gerenciar-cursos']
  const mostrarMenu = !rotasSemMenu.includes(location.pathname)

  return (
    <header
      className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 
        ${theme === 'dark' ? 'bg-gray-900' : 'bg-linear-to-r from-blue-600 to-purple-600'}
      `}
    >
      <div className="relative flex items-center justify-between h-20 px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:scale-105 transition-transform cursor-pointer">
          SkillUp
        </h1>

        {/* Menu + Toggle */}
        <div className="flex items-center gap-4">
          {mostrarMenu && <Menu />}
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  )
}
