import { Link } from "react-router-dom";

export default function FAQ(){
    return(
        <main className="min-h-[calc(100vh-5rem)] py-12 px-4 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Perguntas Frequentes</h1>
                <p className="text-gray-600 mb-6">Abaixo estão as dúvidas mais comuns. Substitua o conteúdo das caixas pelas respostas completas quando desejar.</p>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">-------</h3>
                        <p className="text-gray-600 mt-2">------</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">-------</h3>
                        <p className="text-gray-600 mt-2">------</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">----------</h3>
                        <p className="text-gray-600 mt-2">-----------</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">----------</h3>
                        <p className="text-gray-600 mt-2">----------</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">------------------</h3>
                        <p className="text-gray-600 mt-2">-------------</p>
                    </div>
                </div>
            </div>
        </main>
    )
}