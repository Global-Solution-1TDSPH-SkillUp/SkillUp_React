import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/TipoUsuario";
import type { TipoCurso } from "../../types/TipoCurso";
import type { TipoMatricula } from "../../types/TipoMatricula";
import { FaArrowLeft, FaPlus, FaTrash, FaSearch, FaTimes, FaBook } from "react-icons/fa";

export default function GerenciarCursos() {
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [meusCursos, setMeusCursos] = useState<TipoMatricula[]>([]);
    const [todosCursos, setTodosCursos] = useState<TipoCurso[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [modalConfirmar, setModalConfirmar] = useState(false);
    const [cursoParaRemover, setCursoParaRemover] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<{tipo: 'sucesso' | 'erro', texto: string} | null>(null);
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
                // Carregar todos os cursos disponíveis
                const resCursos = await fetchComRetry('https://skillup-kb0z.onrender.com/cursos');
                if (resCursos.ok) {
                    const dados = await resCursos.json();
                    setTodosCursos(dados);
                }
                
                // Carregar minhas matrículas
                const resMatriculas = await fetchComRetry('https://skillup-kb0z.onrender.com/matriculas');
                if (resMatriculas.ok) {
                    const todasMatriculas = await resMatriculas.json();
                    const minhasMatriculas = todasMatriculas.filter((m: any) => 
                        Number(m.idUsuario) === Number(dadosUsuario.idUsuario)
                    );
                    setMeusCursos(minhasMatriculas);
                } else {
                    setMeusCursos([]);
                }
            } catch (error) {
                setMensagem({
                    tipo: 'erro',
                    texto: 'Erro ao carregar cursos. Verifique sua conexão com a internet.'
                });
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, [navigate]);

    const adicionarCurso = async (curso: TipoCurso) => {
        if (!usuario) return;
        
        setSalvando(true);
        try {
            const response = await fetch('https://skillup-kb0z.onrender.com/matriculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario: usuario.idUsuario,
                    idCurso: curso.idCurso,
                    numeroProgresso: "0",
                    dataInicio: new Date().toISOString().split('T')[0] // YYYY-MM-DD
                })
            });

            if (response.ok) {
                // Backend retorna 201 sem corpo - recarregar matrículas
                const resMatriculas = await fetch('https://skillup-kb0z.onrender.com/matriculas');
                if (resMatriculas.ok) {
                    const todasMatriculas = await resMatriculas.json();
                    const minhasMatriculas = todasMatriculas.filter((m: any) => 
                        Number(m.idUsuario) === Number(usuario.idUsuario)
                    );
                    setMeusCursos(minhasMatriculas);
                }
                setModalAberto(false);
                setBusca('');
                setMensagem({
                    tipo: 'sucesso',
                    texto: 'Matrícula realizada com sucesso!'
                });
                setTimeout(() => setMensagem(null), 3000);
            } else {
                const erro = await response.text();
                setMensagem({
                    tipo: 'erro',
                    texto: `Erro ao matricular: ${erro}`
                });
            }
        } catch (error) {
            setMensagem({
                tipo: 'erro',
                texto: 'Erro ao matricular no curso. Verifique sua conexão.'
            });
        } finally {
            setSalvando(false);
        }
    };

    const abrirModalRemover = (idMatricula: number) => {
        setCursoParaRemover(idMatricula);
        setModalConfirmar(true);
    };

    const confirmarRemocao = async () => {
        if (!usuario || !cursoParaRemover) return;

        setModalConfirmar(false);
        setSalvando(true);

        try {
            const response = await fetch(`https://skillup-kb0z.onrender.com/matriculas/${cursoParaRemover}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMeusCursos(meusCursos.filter(m => m.idMatricula !== cursoParaRemover));
                setMensagem({
                    tipo: 'sucesso',
                    texto: 'Matrícula removida com sucesso!'
                });
                setTimeout(() => setMensagem(null), 3000);
            } else {
                setMensagem({
                    tipo: 'erro',
                    texto: 'Erro ao remover matrícula.'
                });
            }
        } catch (error) {
            setMensagem({
                tipo: 'erro',
                texto: 'Erro ao remover matrícula. Verifique sua conexão.'
            });
        } finally {
            setSalvando(false);
            setCursoParaRemover(null);
        }
    };

    const cursosFiltrados = todosCursos.filter(curso => 
        !meusCursos.some(meu => meu.idCurso === curso.idCurso) &&
        curso.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-800 font-bold text-lg mb-2">Carregando cursos...</p>
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
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/perfil')}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
                    >
                        <FaArrowLeft />
                        Voltar ao Perfil
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gerenciar Cursos</h1>
                    <div className="w-32"></div>
                </div>

                {/* Card de Cursos */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Meus Cursos</h2>
                        <button
                            onClick={() => setModalAberto(true)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm font-semibold"
                        >
                            <FaPlus />
                            Adicionar Curso
                        </button>
                    </div>

                    <div className="space-y-3">
                        {meusCursos.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Nenhum curso matriculado</p>
                        ) : (
                            meusCursos.map(matricula => {
                                const curso = todosCursos.find(c => c.idCurso === matricula.idCurso);
                                return (
                                    <div
                                        key={matricula.idMatricula}
                                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <FaBook className="text-green-600" />
                                                <h3 className="font-semibold text-gray-800">
                                                    {curso?.nome || matricula.nomeCurso || 'Curso'}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {curso?.area || matricula.areaCurso} • {curso?.nivel || matricula.nivelCurso} • {curso?.cargaHoraria || matricula.cargaHorariaCurso}h
                                            </p>
                                            <div className="mt-2">
                                                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                                    <span>Progresso: {matricula.numeroProgresso}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-green-600 h-2 rounded-full transition-all"
                                                        style={{ width: `${matricula.numeroProgresso}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => abrirModalRemover(matricula.idMatricula)}
                                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all ml-4"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Modal de Adicionar Curso */}
                {modalAberto && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">Adicionar Curso</h3>
                                    <button
                                        onClick={() => setModalAberto(false)}
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
                                        value={busca}
                                        onChange={(e) => setBusca(e.target.value)}
                                        placeholder="Buscar curso..."
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Lista de Cursos */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {todosCursos.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhum curso cadastrado no banco de dados</p>
                                    </div>
                                ) : cursosFiltrados.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">Nenhum curso encontrado com "{busca}"</p>
                                    </div>
                                ) : (
                                    cursosFiltrados.map(curso => (
                                        <div
                                            key={curso.idCurso}
                                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-all cursor-pointer"
                                            onClick={() => adicionarCurso(curso)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800">{curso.nome}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {curso.area} • {curso.nivel}
                                                    </p>
                                                    <p className="text-xs text-green-600 mt-2 font-medium">
                                                        Carga horária: {curso.cargaHoraria}h
                                                    </p>
                                                </div>
                                                <FaBook className="text-2xl text-gray-400" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Confirmação */}
                {modalConfirmar && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <FaTrash className="text-3xl text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Remover Matrícula</h2>
                                <p className="text-gray-600">
                                    Tem certeza que deseja remover esta matrícula?
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setModalConfirmar(false);
                                        setCursoParaRemover(null);
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmarRemocao}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mensagem de Feedback */}
                {mensagem && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                        <div className={`px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 ${
                            mensagem.tipo === 'sucesso' ? 'bg-green-600' : 'bg-red-600'
                        } text-white`}>
                            <span className="font-semibold">{mensagem.texto}</span>
                            <button
                                onClick={() => setMensagem(null)}
                                className="ml-2 hover:bg-white hover:bg-opacity-20 rounded p-1"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {salvando && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6">
                            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-gray-700 mt-4">Salvando...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
