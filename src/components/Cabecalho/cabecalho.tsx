import Menu from "../Menu/Menu"


export default function Cabecalho() {
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
                <Menu/>
            </div>
        </header>
    );
}