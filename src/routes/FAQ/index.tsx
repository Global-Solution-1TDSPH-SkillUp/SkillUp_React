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
                        <h3 className="text-lg font-semibold text-gray-800">Como recupero minha senha?</h3>
                        <p className="text-gray-600 mt-2">Use a opção "Esqueci minha senha" na tela de login para receber instruções por e-mail e redefinir sua senha.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">O cadastro é gratuito?</h3>
                        <p className="text-gray-600 mt-2">Sim — criar uma conta e acessar grande parte do conteúdo é gratuito. Alguns cursos ou recursos avançados podem ser pagos.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Recebo certificado pelos cursos?</h3>
                        <p className="text-gray-600 mt-2">Muitos cursos oferecem certificado ao final. Verifique a página do curso para confirmar a disponibilidade e formato do certificado.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Posso integrar meu perfil com o LinkedIn?</h3>
                        <p className="text-gray-600 mt-2">Em breve teremos integração com o LinkedIn para importar habilidades e compartilhar certificados. Por enquanto, você pode exportar seu perfil manualmente.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Quais idiomas o site suporta?</h3>
                        <p className="text-gray-600 mt-2">Atualmente o site está em português. Planejamos adicionar suporte a outros idiomas conforme a demanda.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Quem são vocês?</h3>
                        <p className="text-gray-600 mt-2">Saiba mais sobre nossa equipe e missão na página <Link to="/quemsomos" className="text-purple-600 font-semibold">Quem Somos</Link>.</p>
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