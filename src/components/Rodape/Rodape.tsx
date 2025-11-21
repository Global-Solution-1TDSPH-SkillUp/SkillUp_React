import { useTheme } from '../../contexts/ThemeContext';


export default function Rodape() {
    const { theme } = useTheme();

    return(
        <footer className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 
        ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-linear-to-r from-blue-600 to-purple-600 text-white'}
      `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm">
                        &copy; 2025 SkillUp. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}