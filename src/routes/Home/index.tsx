export default function Home(){
    return(
        <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
            
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl">
                
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 border-b pb-4 border-purple-200">
                    👋 <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bem-vindo(a) ao Skill Up!</span>
                </h2>

                <p className="text-lg text-gray-700 mb-4">
                    O Skill Up é a sua plataforma dedicada ao <strong className="text-purple-600">Reskilling</strong> e <strong className="text-purple-600">Upskilling</strong> – o caminho certo para aprimorar suas habilidades e turbinar seu currículo para o mercado de trabalho.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                    Nossa missão é oferecer o conhecimento necessário para que você se destaque, aprenda novas <em className="text-blue-600 italic">skills</em> e conquiste as melhores oportunidades.
                </p>

                <div className="h-1 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full my-10"></div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Como Usar o Site
                </h3>
                <p className="text-gray-600 mb-8">
                    Navegue pelas seções abaixo para entender como aproveitar ao máximo a sua experiência no Skill Up.
                </p>

                <div className="mb-10 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500 shadow-sm">
                    <h4 className="text-2xl font-semibold text-purple-700 mb-3">
                        👤 Perfil
                    </h4>
                    <p className="text-gray-700 mb-4">
                        Esta é a sua área central! Aqui, você encontra suas informações de <strong className="font-bold">Nome</strong> e <strong className="font-bold">Área de Interesse</strong>. Lembre-se que seu perfil é <strong className="text-purple-600">totalmente editável</strong>, permitindo que você atualize seus dados a qualquer momento.
                    </p>

                    <h5 className="text-xl font-medium text-blue-700 mt-6 mb-2">
                        Gerenciamento de Aprendizado
                    </h5>
                    <p className="text-gray-700 mb-4 ml-4 border-l pl-4 border-blue-300">
                        Na aba de <strong className="font-bold">Cursos Concluídos</strong>, você pode <strong className="text-blue-600">gerenciar</strong> ativamente sua jornada. É possível acompanhar o progresso dos cursos em andamento e facilmente <strong className="font-bold">entrar em novos cursos</strong>, mantendo o controle total sobre seu aprimoramento profissional.
                    </p>

                    <h5 className="text-xl font-medium text-blue-700 mt-6 mb-2">
                        Suas Habilidades (Skills)
                    </h5>
                    <p className="text-gray-700 mb-2 ml-4 border-l pl-4 border-blue-300">
                        No lado direito, você encontrará a <strong className="font-bold">Tabela de Skills</strong>. Esta tabela lista suas competências, que incluem tanto <strong className="text-pink-600">Hard Skills</strong> (como Java, Python) quanto <strong className="text-pink-600">Soft Skills</strong> (como Liderança), registradas no seu cadastro.
                    </p>
                    <p className="text-gray-700 mb-4 ml-4 border-l pl-4 border-blue-300">
                        Use o botão <strong className="text-purple-600">Gerenciar Skills</strong> para adicionar, remover ou editar suas habilidades, mantendo seu inventário de competências sempre preciso e pronto para o mercado.
                    </p>

                    <h5 className="text-xl font-medium text-blue-700 mt-6 mb-4">
                        Ferramentas de Carreira
                    </h5>
                    <ul className="space-y-4 ml-4">
                        <li className="flex items-start text-gray-700 border-l pl-4 border-blue-300">
                            <span className="text-purple-500 mr-3 text-xl">📄</span>
                            <div>
                                <strong className="font-bold text-gray-800">Gerar Relatório:</strong> Clicando aqui, o sistema gera um <strong className="text-purple-600">relatório formatado</strong>, pronto para ser usado como seu <strong className="text-purple-600">currículo</strong>, exibindo seus dados, cursos e habilidades de forma profissional.
                            </div>
                        </li>
                        <li className="flex items-start text-gray-700 border-l pl-4 border-blue-300">
                             <span className="text-purple-500 mr-3 text-xl">🚪</span>
                            <div>
                                <strong className="font-bold text-gray-800">Sair da Aplicação:</strong> Botão de segurança para fazer o <strong className="text-red-500">logout</strong> e sair da sua conta quando terminar de usar a plataforma.
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="h-1 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full my-10"></div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Links Úteis
                </h3>

                <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-pink-500">
                        <h4 className="text-xl font-semibold text-pink-700 mb-2 flex items-center">
                            <span className="text-2xl mr-2">📚</span> Quem Somos
                        </h4>
                        <p className="text-gray-700">
                            Quer saber quem está por trás do projeto Skill Up? Na aba <strong className="font-bold">Quem Somos</strong>, apresentamos os <strong className="text-pink-600">responsáveis</strong> e a equipe dedicada a construir esta plataforma de aprimoramento profissional.
                        </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-semibold text-blue-700 mb-2 flex items-center">
                            <span className="text-2xl mr-2">📧</span> Contato
                        </h4>
                        <p className="text-gray-700">
                            Tem dúvidas, sugestões ou quer fazer uma parceria? A página de <strong className="font-bold">Contato</strong> oferece todas as formas de entrar em contato conosco. Sua opinião é muito importante!
                        </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-semibold text-purple-700 mb-2 flex items-center">
                            <span className="text-2xl mr-2">❓</span> FAQ (Dúvidas Frequentes)
                        </h4>
                        <p className="text-gray-700">
                            Antes de nos contatar, confira a nossa seção de <strong className="font-bold">FAQ</strong>. Nela, reunimos as <strong className="text-purple-600">dúvidas mais frequentes</strong> dos nossos usuários. Você pode encontrar a resposta que procura de forma rápida e eficiente.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}