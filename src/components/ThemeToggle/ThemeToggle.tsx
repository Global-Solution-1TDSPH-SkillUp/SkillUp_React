import { useTheme } from '../../contexts/ThemeContext'
import { FaSun as Sun, FaMoon as Moon } from 'react-icons/fa'

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  const label =
    theme === 'dark'
      ? 'Modo escuro ativado. Clique para voltar ao claro.'
      : 'Modo claro ativado. Clique para ir para o escuro.'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label={label}
      style={{
        padding: '0.6rem 1.4rem',
        borderRadius: 999,
        border: '1px solid #aaa',
        cursor: 'pointer',
        background: theme === 'dark' ? '#222' : '#fff',
        color: theme === 'dark' ? '#f5f5f5' : '#222',
        transition: 'background 0.3s ease, color 0.3s ease, transform 0.1s ease',
      }}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  )
}
