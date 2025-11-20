import { Link } from "react-router-dom";

export default function FAQ(){
    return(
        <main className="min-h-[calc(100vh-5rem)] py-12 px-4 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Perguntas Frequentes</h1>
                <p className="text-gray-600 mb-6">Abaixo estão as dúvidas mais comuns.</p>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Como o sistema funciona?</h3>
                        <p className="text-gray-600 mt-2">Com base nas informações fornecidas pelo usuário, o sistema analisa formações e skills para recomendar cursos (Upskilling) ou aprofundamento (Reskilling).</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">O sistema funciona 24 horas?</h3>
                        <p className="text-gray-600 mt-2">Sim — a plataforma está disponível 24 horas por dia.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">O sistema irá apresentar minhas Skills?</h3>
                        <p className="text-gray-600 mt-2">Sim — você pode cadastrar e exibir suas Hard Skills e Soft Skills no perfil.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Posso exportar meu Perfil?</h3>
                        <p className="text-gray-600 mt-2">Sim — é possível exportar seu perfil com cursos e skills cadastrados.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Como posso entrar em Contato?</h3>
                        <p className="text-gray-600 mt-2">Você pode entrar em contato conosco na página <Link to="/contato" className="text-purple-600 font-semibold">Contato</Link>.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}