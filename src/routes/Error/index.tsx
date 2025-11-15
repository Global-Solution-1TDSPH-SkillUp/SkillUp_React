import { Link } from "react-router-dom";

export default function Error(){
    return(
        <div className="min-h-screen flex items-center justify-center px-4 bg-red-600">
            <div className="text-center text-white">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-8">Página não encontrada</h2>
                <Link 
                    to="/"
                    className="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                    Voltar para Home
                </Link>
            </div>
        </div>
    )
}