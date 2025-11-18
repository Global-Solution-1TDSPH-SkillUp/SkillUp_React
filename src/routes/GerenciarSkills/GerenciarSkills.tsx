import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/TipoUsuario";
import type { TipoHardSkill, TipoSoftSkill, TipoUsuarioHardSkill, TipoUsuarioSoftSkill } from "../../types/TipoSkill";
import { FaArrowLeft, FaPlus, FaTrash, FaSearch, FaTimes } from "react-icons/fa";

export default function GerenciarSkills() {
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [minhasHardSkills, setMinhasHardSkills] = useState<TipoUsuarioHardSkill[]>([]);
    const [minhasSoftSkills, setMinhasSoftSkills] = useState<TipoUsuarioSoftSkill[]>([]);
    const [todasHardSkills, setTodasHardSkills] = useState<TipoHardSkill[]>([]);
    const [todasSoftSkills, setTodasSoftSkills] = useState<TipoSoftSkill[]>([]);
    const [modalAberto, setModalAberto] = useState<'hard' | 'soft' | null>(null);
    const [buscaHard, setBuscaHard] = useState('');
    const [buscaSoft, setBuscaSoft] = useState('');
    const [nivelSelecionado, setNivelSelecionado] = useState<string>('Básico');
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            const usuarioStorage = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
            
            if (!usuarioStorage) {
                navigate('/');
                return;
            }

            const dadosUsuario = JSON.parse(usuarioStorage);
            setUsuario(dadosUsuario);

            // Função para tentar fetch com retry (cold start no Render)
            const fetchComRetry = async (url: string, tentativas = 2): Promise<Response> => {
                for (let i = 0; i < tentativas; i++) {
                    try {
                        const res = await fetch(url);
                        if (res.ok) return res;
                        
                        // Se erro 404, aguardar antes de tentar novamente (cold start)
                        if (res.status === 404 && i < tentativas - 1) {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            continue;
                        }
                        return res;
                    } catch (erro) {
                        if (i < tentativas - 1) {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            continue;
                        }
                        throw erro;
                    }
                }
                throw new Error('Falha após tentativas');
            };

            try {
                // Carregar Hard Skills Disponíveis
                const resHard = await fetchComRetry('https://skillup-kb0z.onrender.com/hardskills');
                if (resHard.ok) {
                    const dados = await resHard.json();
                    setTodasHardSkills(dados);
                }
                
                // Carregar Soft Skills Disponíveis
                const resSoft = await fetchComRetry('https://skillup-kb0z.onrender.com/softskills');
                if (resSoft.ok) {
                    const dados = await resSoft.json();
                    setTodasSoftSkills(dados);
                }
                
                // Carregar Minhas Hard Skills
                const resMinhasHard = await fetchComRetry('https://skillup-kb0z.onrender.com/usuario-hardskill');
                if (resMinhasHard.ok) {
                    const todosRegistros = await resMinhasHard.json();
                    const dados = todosRegistros.filter((r: any) => 
                        Number(r.idUsuario) === Number(dadosUsuario.idUsuario)
                    );
                    setMinhasHardSkills(dados);
                } else {
                    setMinhasHardSkills([]);
                }
                
                // Carregar Minhas Soft Skills
                const resMinhasSoft = await fetchComRetry(`https://skillup-kb0z.onrender.com/usuario-softskills/usuario/${dadosUsuario.idUsuario}`);
                if (resMinhasSoft.ok) {
                    const dados = await resMinhasSoft.json();
                    setMinhasSoftSkills(dados);
                } else {
                    setMinhasSoftSkills([]);
                }
            } catch (error) {
                console.error('❌ ERRO FATAL ao carregar skills:', error);
                alert('❌ Erro ao visualizar skills.\n\nVerifique sua conexão com a internet ou pode ser um erro interno no servidor.');
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, [navigate]);

    const adicionarHardSkill = async (skill: TipoHardSkill) => {
        if (!usuario) return;
        
        setSalvando(true);
        try {
            const response = await fetch('https://skillup-kb0z.onrender.com/usuario-hardskill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario: usuario.idUsuario,
                    idHardSkill: skill.idHardSkill,
                    nivelConhecimento: nivelSelecionado
                })
            });

            if (response.ok) {
                const novaSkill: TipoUsuarioHardSkill = {
                    idUsuario: usuario.idUsuario,
                    idHardSkill: skill.idHardSkill,
                    nivelConhecimento: nivelSelecionado,
                    nomeUsuario: usuario.nome,
                    nomeHardSkill: skill.nomeHardSkill
                };
                setMinhasHardSkills([...minhasHardSkills, novaSkill]);
                setModalAberto(null);
                setNivelSelecionado('Básico');
            }
        } catch (error) {
            alert('❌ Erro ao cadastrar skill.\n\nVerifique sua conexão com a internet ou pode ser um erro interno no servidor.');
        } finally {
            setSalvando(false);
        }
    };

    const adicionarSoftSkill = async (skill: TipoSoftSkill) => {
        if (!usuario) return;
        
        setSalvando(true);
        try {
            const response = await fetch('https://skillup-kb0z.onrender.com/usuario-softskills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario: usuario.idUsuario,
                    idSoftSkill: skill.idSoftSkill,
                    nivelDominio: nivelSelecionado
                })
            });

            if (response.ok) {
                const novaSkill: TipoUsuarioSoftSkill = {
                    idUsuario: usuario.idUsuario,
                    idSoftSkill: skill.idSoftSkill,
                    nivelDominio: nivelSelecionado,
                    nomeUsuario: usuario.nome,
                    nomeSoftSkill: skill.nomeSofSkill
                };
                setMinhasSoftSkills([...minhasSoftSkills, novaSkill]);
                setModalAberto(null);
                setNivelSelecionado('Básico');
            }
        } catch (error) {
            alert('❌ Erro ao cadastrar skill.\n\nVerifique sua conexão com a internet ou pode ser um erro interno no servidor.');
        } finally {
            setSalvando(false);
        }
    };

    const removerHardSkill = async (idHardSkill: number) => {
        if (!usuario || !confirm('Deseja remover esta hard skill?')) return;

        try {
            const response = await fetch(`https://skillup-kb0z.onrender.com/usuario-hardskill/${usuario.idUsuario}/${idHardSkill}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMinhasHardSkills(minhasHardSkills.filter(s => s.idHardSkill !== idHardSkill));
            }
        } catch (error) {
            alert('❌ Erro ao remover skill.\n\nVerifique sua conexão com a internet ou pode ser um erro interno no servidor.');
        }
    };

    const removerSoftSkill = async (idSoftSkill: number) => {
        if (!usuario || !confirm('Deseja remover esta soft skill?')) return;

        try {
            const response = await fetch(`https://skillup-kb0z.onrender.com/usuario-softskills/${usuario.idUsuario}/${idSoftSkill}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMinhasSoftSkills(minhasSoftSkills.filter(s => s.idSoftSkill !== idSoftSkill));
            }
        } catch (error) {
            alert('❌ Erro ao remover skill.\n\nVerifique sua conexão com a internet ou pode ser um erro interno no servidor.');
        }
    };

    const hardSkillsFiltradas = todasHardSkills.filter(skill => 
        !minhasHardSkills.some(minha => minha.idHardSkill === skill.idHardSkill) &&
        skill.nomeHardSkill.toLowerCase().includes(buscaHard.toLowerCase())
    );

    const softSkillsFiltradas = todasSoftSkills.filter(skill => 
        !minhasSoftSkills.some(minha => minha.idSoftSkill === skill.idSoftSkill) &&
        skill.nomeSofSkill.toLowerCase().includes(buscaSoft.toLowerCase())
    );

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-800 font-bold text-lg mb-2">Carregando skills...</p>
                    <p className="text-gray-600 text-sm mb-1">
                        ⏱️ O carregamento pode levar de 3 a 30 segundos
                    </p>
                    <p className="text-gray-500 text-xs">
                        devido ao tempo de inicialização do servidor.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-3 sm:px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/perfil')}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
                    >
                        <FaArrowLeft />
                        Voltar ao Perfil
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gerenciar Skills</h1>
                    <div className="w-32"></div> {/* Spacer para centralizar */}
                </div>

                {/* Grid de Hard Skills e Soft Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Hard Skills */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Hard Skills</h2>
                            <button
                                onClick={() => setModalAberto('hard')}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                            >
                                <FaPlus />
                                Adicionar
                            </button>
                        </div>

                        <div className="space-y-3">
                            {minhasHardSkills.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">Nenhuma hard skill adicionada</p>
                            ) : (
                                minhasHardSkills.map(skill => (
                                    <div
                                        key={skill.idHardSkill}
                                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{skill.nomeHardSkill}</h3>
                                            <p className="text-sm text-gray-600">Nível: {skill.nivelConhecimento}</p>
                                        </div>
                                        <button
                                            onClick={() => removerHardSkill(skill.idHardSkill)}
                                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Soft Skills</h2>
                            <button
                                onClick={() => setModalAberto('soft')}
                                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-sm font-semibold"
                            >
                                <FaPlus />
                                Adicionar
                            </button>
                        </div>

                        <div className="space-y-3">
                            {minhasSoftSkills.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">Nenhuma soft skill adicionada</p>
                            ) : (
                                minhasSoftSkills.map(skill => (
                                    <div
                                        key={skill.idSoftSkill}
                                        className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{skill.nomeSoftSkill}</h3>
                                            <p className="text-sm text-gray-600">Nível: {skill.nivelDominio}</p>
                                        </div>
                                        <button
                                            onClick={() => removerSoftSkill(skill.idSoftSkill)}
                                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal de Adicionar Hard Skill */}
                {modalAberto === 'hard' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">Adicionar Hard Skill</h3>
                                    <button
                                        onClick={() => setModalAberto(null)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <FaTimes className="text-2xl" />
                                    </button>
                                </div>

                                {/* Busca */}
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={buscaHard}
                                        onChange={(e) => setBuscaHard(e.target.value)}
                                        placeholder="Buscar hard skill..."
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Seletor de Nível */}
                                <div className="mt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nível de Conhecimento</label>
                                    <select
                                        value={nivelSelecionado}
                                        onChange={(e) => setNivelSelecionado(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="Básico">Básico</option>
                                        <option value="Intermediário">Intermediário</option>
                                        <option value="Avançado">Avançado</option>
                                    </select>
                                </div>
                            </div>

                            {/* Lista de Skills */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {todasHardSkills.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhuma hard skill cadastrada no banco de dados</p>
                                        <p className="text-sm text-gray-400">Total de skills: {todasHardSkills.length}</p>
                                    </div>
                                ) : hardSkillsFiltradas.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhuma skill encontrada com "{buscaHard}"</p>
                                        <p className="text-sm text-gray-400">Disponíveis: {todasHardSkills.length - minhasHardSkills.length}</p>
                                    </div>
                                ) : (
                                    hardSkillsFiltradas.map(skill => (
                                        <div
                                            key={skill.idHardSkill}
                                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer"
                                            onClick={() => adicionarHardSkill(skill)}
                                        >
                                            <h4 className="font-semibold text-gray-800">{skill.nomeHardSkill}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{skill.descricaoHardSkill}</p>
                                            <p className="text-xs text-blue-600 mt-2 font-medium">Categoria: {skill.categoriaHardSkill}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Adicionar Soft Skill */}
                {modalAberto === 'soft' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">Adicionar Soft Skill</h3>
                                    <button
                                        onClick={() => setModalAberto(null)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <FaTimes className="text-2xl" />
                                    </button>
                                </div>

                                {/* Busca */}
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={buscaSoft}
                                        onChange={(e) => setBuscaSoft(e.target.value)}
                                        placeholder="Buscar soft skill..."
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                {/* Seletor de Nível */}
                                <div className="mt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nível de Domínio</label>
                                    <select
                                        value={nivelSelecionado}
                                        onChange={(e) => setNivelSelecionado(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                    >
                                        <option value="Básico">Básico</option>
                                        <option value="Intermediário">Intermediário</option>
                                        <option value="Avançado">Avançado</option>
                                    </select>
                                </div>
                            </div>

                            {/* Lista de Skills */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {todasSoftSkills.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhuma soft skill cadastrada no banco de dados</p>
                                        <p className="text-sm text-gray-400">Total de skills: {todasSoftSkills.length}</p>
                                    </div>
                                ) : softSkillsFiltradas.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhuma skill encontrada com "{buscaSoft}"</p>
                                        <p className="text-sm text-gray-400">Disponíveis: {todasSoftSkills.length - minhasSoftSkills.length}</p>
                                    </div>
                                ) : (
                                    softSkillsFiltradas.map(skill => (
                                        <div
                                            key={skill.idSoftSkill}
                                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all cursor-pointer"
                                            onClick={() => adicionarSoftSkill(skill)}
                                        >
                                            <h4 className="font-semibold text-gray-800">{skill.nomeSofSkill}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{skill.descricaoSofSkill}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {salvando && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-gray-700 mt-4">Salvando...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
