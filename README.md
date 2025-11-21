# SkillUp 🚀

## 👥 Membros da Equipe

- Pietro Paranhos Wilhelm - RM561378
- João Vitor Biribilli Ravelli - RM565594
- Gabriel Neris Losano - RM564093

## 📋 Sobre o Projeto
SkillUp é uma plataforma de gerenciamento de competências profissionais que permite aos usuários cadastrar suas habilidades (hard e soft skills), matricular-se em cursos e acompanhar seu progresso de desenvolvimento profissional.

## 🎯 Objetivo

O projeto SkillUp tem como objetivo oferecer uma solução digital inovadora voltada ao gerenciamento e desenvolvimento de competências técnicas (Hard Skills) e comportamentais (Soft Skills) dos colaboradores de uma empresa. A proposta busca resolver o problema da falta de visibilidade e acompanhamento estruturado das habilidades individuais, que dificulta a alocação eficiente de profissionais em projetos e o planejamento de treinamentos estratégicos.

Por meio de um sistema integrado e acessível via interface web, o SkillUp permite cadastrar, consultar e atualizar as competências de cada usuário, relacionando-as com cursos e recomendações personalizadas. A aplicação centraliza informações essenciais para o RH e líderes técnicos, promovendo uma gestão mais inteligente de talentos e competências.

Além disso, o sistema possibilita o mapeamento automático de gaps de conhecimento, permitindo identificar quais colaboradores necessitam de capacitação adicional. A solução visa aumentar a produtividade e a eficiência da empresa, transformando dados sobre habilidades em inteligência estratégica para tomada de decisão.

## 💡 Justificativa da Escolha do Tema

A escolha do tema se justifica pela demanda crescente das organizações por soluções digitais que apoiem o desenvolvimento contínuo de seus profissionais, especialmente em um contexto de transformação digital acelerada. Muitas empresas enfrentam dificuldades em manter atualizadas as informações sobre o nível de conhecimento técnico e comportamental de seus colaboradores, o que impacta negativamente a performance e a capacidade de inovação.

O SkillUp foi idealizado como resposta direta a esse desafio, automatizando o processo de acompanhamento das competências e criando um ambiente onde o aprendizado é contínuo, mensurável e transparente. A solução está alinhada ao desafio proposto pela Sprint, que estimula o uso da tecnologia para resolver problemas reais de gestão e capacitação dentro de empresas parceiras.

Com a utilização de tecnologias modernas como Java, Jakarta EE, Oracle Database e APIs REST, o projeto garante robustez, desempenho e escalabilidade, atendendo aos padrões exigidos em ambientes corporativos. Assim, a iniciativa não apenas melhora a eficiência operacional, mas também fomenta a cultura de aprendizado e valorização de talentos dentro das organizações.


## 🔗 Links Importantes

### Link do Vídeo publicano no youtube
- **Vídeo**: https://www.youtube.com/watch?v=cR7OBi7-fBc

### API Backend (Java)
- **URL da API**: https://skillup-kb0z.onrender.com
- **Tecnologias**: Java, Jakarta EE, JAX-RS
- **Hospedagem**: Render.com (Free Tier - pode ter cold start de 10-30s)

### Repositório GitHub
- **URL**: https://github.com/Global-Solution-1TDSPH-SkillUp/SkillUp_React.git
- **Branch Principal**: `develop`

## App Na Vercel
- **URL**: https://skill-up-react-nine.vercel.app/

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 19.2.0 - Biblioteca principal
- **TypeScript** 5.6.2 - Tipagem estática
- **Tailwind CSS** 4.1.17 - Framework de estilização (v4 syntax)
- **React Router DOM** 7.9.5 - Navegação e roteamento
- **React Icons** 5.4.0 - Ícones da aplicação
- **Vite** 6.0.11 - Build tool e dev server

### Backend
- **Java** com Jakarta EE
- **JAX-RS** para API REST
- **Banco de Dados Oracle** (via DAO)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Cabecalho/       # Header com menu de navegação
│   ├── ExibirEndereco/  # Exibição de endereços do usuário
│   ├── Menu/            # Menu lateral
│   ├── Rodape/          # Footer
│   └── ThemeToggle/     # Alternância de tema (Dark/Light)
├── contexts/            # Contextos globais
│   └── ThemeContext.tsx # Gerenciamento de tema
├── routes/              # Páginas da aplicação
│   ├── Cadastro/        # Registro de novo usuário
│   ├── Contato/         # Formulário de contato
│   ├── EditarPerfil/    # Edição de dados do usuário
│   ├── Endereco/        # Gerenciamento de endereços
│   ├── Error/           # Página de erro 404
│   ├── FAQ/             # Perguntas frequentes
│   ├── GerenciarCursos/ # CRUD de matrículas em cursos
│   ├── GerenciarSkills/ # CRUD de habilidades
│   ├── Home/            # Página inicial
│   ├── Login/           # Autenticação de usuário
│   ├── Perfil/          # Visualização do perfil
│   └── QuemSomos/       # Equipe
├── types/               # Definições TypeScript
│   ├── TipoCurso.ts
│   ├── TipoEndereco.ts
│   ├── TipoMatricula.ts
│   ├── TipoSkill.ts
│   └── TipoUsuario.ts
├── utils/               # Utilitários e helpers
│   ├── EstadosBrasileiros.ts # Lista de estados brasileiros
├── App.tsx              # Componente raiz
├── globals.css          # Estilos globais
├── main.tsx             # Entry point
```

## 🚀 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Login e cadastro de usuários
- **Perfil do Usuário**: Visualização e edição de dados pessoais
- **Gerenciamento de Skills**: 
  - Adicionar/remover Hard Skills (técnicas)
  - Adicionar/remover Soft Skills (comportamentais)
  - Seleção de nível de proficiência (Básico, Intermediário, Avançado)
- **Gerenciamento de Cursos**:
  - Matricular-se em cursos disponíveis
  - Acompanhar progresso (0-100%)
  - Remover matrículas
  - Visualização de cursos com área, nível e carga horária
- **Sistema de Feedback**: Modais personalizados para confirmações e mensagens
- **Cache Inteligente**: Carregamento progressivo com cache local para melhor UX
- **Retry Logic**: Tratamento automático de cold start do servidor (Render.com)
- **Design Responsivo**: Interface adaptável para mobile, tablet e desktop

### 🔄 Endpoints da API Consumidos

#### Usuários
- `POST /usuario` - Cadastro de novo usuário
- `GET /usuario` - Listar todos os usuários (filtrado no frontend)
- `PUT /usuario/{id}` - Atualizar dados do usuário
- `DELETE /usuario/{id}` - Excluir conta

#### Skills
- `GET /hardskills` - Listar hard skills disponíveis
- `GET /softskills` - Listar soft skills disponíveis
- `GET /usuario-hardskill` - Listar associações usuário-hardskill
- `GET /usuario-softskills/usuario/{id}` - Soft skills de um usuário
- `POST /usuario-hardskill` - Adicionar hard skill ao usuário
- `POST /usuario-softskills` - Adicionar soft skill ao usuário
- `DELETE /usuario-hardskill/{id}` - Remover hard skill
- `DELETE /usuario-softskills/{id}` - Remover soft skill

#### Cursos
- `GET /cursos` - Listar todos os cursos disponíveis
- `POST /usuario-curso` - Matricular usuário em um curso
- `GET /usuario-curso/usuario/{id}` - Listar cursos de um usuário
- `PUT /usuario-curso/{id}` - Atualizar progresso de um curso
- `DELETE /usuario-curso/{id}` - Remover matrícula de um curso

#### Endereços
- `POST /usuario-endereco` - Adicionar endereço ao usuário
- `GET /usuario-endereco/usuario/{id}` - Listar endereços de um usuário
- `PUT /usuario-endereco/{id}` - Atualizar endereço do usuário


## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Global-Solution-1TDSPH-SkillUp/SkillUp_React.git

# Entre na pasta do projeto
cd SkillUp_React

# Instale as dependências
npm install

# Execute o projeto em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

O projeto estará disponível em `http://localhost:5173`

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Azul (`bg-blue-600`) - Ações principais
- **Secundária**: Roxo (`bg-purple-600`) - Destaque secundário
- **Skills**: Verde (`bg-green-600`) - Gerenciamento de cursos
- **Sucesso**: Verde (`bg-green-600`)
- **Erro/Deletar**: Vermelho (`bg-red-600`)
- **Neutro**: Cinza (`bg-gray-400`)

### Componentes Customizados
- Botões com efeito hover e sombras
- Cards com gradientes
- Modais animados
- Loading states informativos
- Progress bars para cursos
- Grid responsivo 3x3 (skills) e 2x2 (cursos)

## 📝 Tipos TypeScript

### TipoUsuario
```typescript
{
  idUsuario: number;
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string; // YYYY-MM-DD
  areaInteresse: string;
}
```

### TipoMatricula
```typescript
{
  idMatricula: number;
  numeroProgresso: string; // "0" a "100"
  dataInicio: string; // YYYY-MM-DD
  idUsuario: number;
  idCurso: number;
  // Campos do JOIN
  nomeCurso?: string;
  areaCurso?: string;
  nivelCurso?: string;
  cargaHorariaCurso?: number;
}
```

## ⚙️ Configurações Importantes

### Tailwind CSS v4
O projeto usa a sintaxe moderna do Tailwind v4:
- `bg-linear-to-r` ao invés de `bg-gradient-to-r`
- `aspect-square` para proporções
- Configuração via `@import "tailwindcss"`

### Retry Strategy
Sistema de retry para lidar com cold start do Render.com:
- 2 tentativas automáticas
- Delay de 3 segundos entre tentativas
- Mensagens informativas ao usuário

### Cache System
- Cache local com `localStorage`
- Chave única por usuário: `perfil_{idUsuario}`
- Atualização em background
- Carregamento progressivo

## 🔮 Implementações Futuras

> **Nota**: Conforme acordado com o Professor Orientador **Alexandre Carlos de Jesus**, algumas dessas implementações futuras podem levar este projeto ao **NEXT** ou torná-lo uma pesquisa científica.

### Curto Prazo
- [x] Validação duplicada de matrículas no frontend
- [x] Filtros avançados de cursos (por área, nível, carga horária)
- [x] Gráficos de progresso em cursos
- [ ] Exportação de relatório em PDF
- [x] Dark mode

### Médio Prazo
- [x] **GitFlow**: Integração completa com workflow Git
- [ ] **Skills personalizadas**: Usuário escrever skills livremente
- [ ] **Mais cursos**: Expandir catálogo de cursos
- [ ] **Busca inteligente**: Filtros e ordenação avançados
- [ ] **Gamificação**: Badges, conquistas e ranking
- [ ] **Compartilhamento**: Exportar perfil público - O botão está implementado falta apenas sua função

### Longo Prazo
- [ ] **IA de Análise**: Sistema de IA para analisar perfis e sugerir skills/cursos
- [ ] **Auth0**: Sistema de autenticação profissional
- [ ] **Recomendações**: ML para sugerir cursos baseado no perfil
- [ ] **Comunidade**: Fórum e networking entre usuários
- [ ] **Certificados**: Emissão de certificados de conclusão
- [ ] **Integração LinkedIn**: Importar/exportar dados

## 🐛 Problemas Conhecidos

### Cold Start (Render.com)
- **Causa**: Backend no plano gratuito hiberna após inatividade
- **Solução**: Retry automático com mensagens informativas ao usuário
- **Tempo de espera**: 3-30 segundos na primeira requisição do dia
- **Impacto no Perfil**: Devido ao cold start, o sistema pode ter dificuldade ao carregar todos os dados simultaneamente, causando demora para exibir informações do usuário. Por exemplo, é possível que os cursos sejam carregados, mas as skills não apareçam inicialmente, mesmo que estejam cadastradas. Aguarde alguns segundos e recarregue a página se necessário.
- **Recomendação**: Após a primeira requisição bem-sucedida, as próximas carregam normalmente em 1-3 segundos. 

## 👥 Equipe e Informações do Projeto

- **Instituição**: FIAP - Faculdade de Informática e Administração Paulista
- **Turma**: 1TDSPH
- **Repositório**: Global-Solution-1TDSPH-SkillUp
- **Branch de Desenvolvimento**: `develop`
- **Branch de Produção**: `main`
- **Professor Orientador**: Alexandre Carlos de Jesus

## 📞 Contato
- **E-mail**: skillup@ot.com.br
- **numero**: +55 11 9923-0238

## 📄 Licença

Este projeto é parte do trabalho acadêmico da FIAP - Turma 1TDSPH.

---

**⚠️ Nota Importante**: O tempo de carregamento inicial pode levar de 3 a 30 segundos devido ao cold start do servidor no Render.com (plano gratuito). Após a primeira requisição, as próximas serão significativamente mais rápidas.

